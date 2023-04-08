const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const moment = require('moment');
const yaml = require('js-yaml');
const fm = require('front-matter');
const marked = require('./markdown/marked');
const template = require('art-template');

module.exports = class Qingya {

    constructor() {
        this.rootDir = path.join(__dirname, '..');
        this.updateConfig();
    }

    path(...dir) {
        return path.join(this.rootDir, ...dir);
    }

    publicDir(...dir)
    {
        return path.join(this.rootDir, this.config.public_dir, ...dir);
    }

    sourceDir(...dir)
    {
        return path.join(this.rootDir, this.config.source_dir, ...dir);
    }

    checkDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    updateConfig() {
        this.config = yaml.safeLoad(fs.readFileSync(this.path('_config.yml'), 'utf8'));
        this.parseMD5();
        template.defaults.minimize = this.config.minimize; // Configure whether to compress HTML, JS, CSS. https://aui.github.io/art-template/docs/minimize.html#Configuration
    }

    getDateFormat() {
        return this.config.date_format + ' ' + this.config.time_format;
    }

    getMD5(str) {
        return crypto.createHash('md5').update(str, 'utf8').digest('hex');
    }

    parseMD5() {
        var file = this.path('md5.log');
        if (fs.existsSync(file)) {
            this.MD5History = JSON.parse(fs.readFileSync(file, 'utf-8') || '{}');
        } else {
            this.MD5History = {};
        }
    }

    clearMD5() {
        var file = this.path('md5.log');
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    }

    initgit() {
        this.checkDir(this.publicDir());
        this.checkDir(this.publicDir('css'));
        this.checkDir(this.publicDir('post'));

        var opt = this.config.deploy;
        execSync([
            `cd ${this.publicDir()}`,
            'git init',
            `git remote add origin "${opt.repository}"`,
        ].join('&&'));
        console.log('[√] git is initialized.');
    }

    deploygit(massage) {
        var opt = this.config.deploy;
        execSync([
            `cd ${this.publicDir()}`,
            `git config user.email "${opt.user_email}"`,
            `git config user.name "${opt.user_name}"`,
            'git add .',
            `git commit --allow-empty -m "${massage}"`,
            `git push -u origin ${opt.branch}`
        ].join('&&'));
        console.log('[√] Deploying to git is finished.');
    }

    pushgit() {
        execSync([
            `cd ${this.publicDir()}`,
            'git push'
        ].join('&&'));
    }

    copyCSS() {
        var destDir = this.publicDir('css');
        var srcDir = this.path('src/css');

        fs.readdir(srcDir, 'utf8', (err, filename) => {
            if (err) throw err;
            filename.forEach(e => {
                fs.copyFile(path.join(srcDir, e), path.join(destDir, e), (err) => {
                    if (err) throw err;
                    console.log(`[√] copy ${e}`);
                });
            });
        });
    }

    async generate() {
        this.updateConfig();
        this.copyCSS();

        // traverse and compile posts
        var posts = [];
        var postFilenames = fs.readdirSync(this.sourceDir('posts'));
        for (let filename of postFilenames) {
            posts.push(await this.compilePost(filename));
        }

        // traverse and compile pages
        var pages = [];
        var pageFilenames = fs.readdirSync(this.sourceDir()).slice(0, -1);
        for (let filename of pageFilenames) {
            pages.push(await this.compilePage(filename));
        }

        // compile index.html
        this.compileIndex(posts, pages);
    }

    async compilePosts(...filenames) {
        this.updateConfig();
        for (let filename of filenames) {
            await this.compilePost(filename);
        }
    }

    async compilePages(...filenames) {
        this.updateConfig();
        for (let filename of filenames) {
            await this.compilePage(filename);
        }
    }

    compilePost(filename) {

        return new Promise((resolve, reject) => {
            
            fs.readFile(this.sourceDir('posts', filename), 'utf8', (err, data) => {

                if (err) throw err;

                // parse the yaml of the header
                var option = fm(data);

                // date of post
                var date = moment(option.attributes.date).utc().format(this.getDateFormat());

                // check whether the file has been changed by MD5
                var md5 = this.getMD5(data);
                var output = {
                    title: option.attributes.title,
                    cover: option.attributes.cover,
                    ISOString: option.attributes.date,
                    date,
                    md5,
                    filename
                };

                // if the file has not been changed, return
                if (this.MD5History[filename] == md5) {
                    resolve(output);
                    console.log(`[√] ${option.attributes.title} not changed.`);
                    return
                }

                // parse and generate content
                var content = marked.parse(option.body);

                // generate html according to the template
                var html = template(this.path('src/template/post.art'), {
                    type: 'post',
                    title: option.attributes.title,
                    date,
                    hasCode: option.attributes.code ?? true,
                    content,
                    config: this.config
                });

                // write to file
                var theDir = this.publicDir('post', option.attributes.title);
                this.checkDir(theDir);
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) throw err;
                    console.log(`[√] ${option.attributes.title}`);
                });

                resolve(output);

            });

        });

    }

    compilePage(filename) {

        return new Promise((resolve, reject) => {

            fs.readFile(this.sourceDir(filename), 'utf8', (err, data) => {

                if (err) throw err;

                // parse the yaml of the header
                var option = fm(data);

                // check whether the file has been changed by MD5
                var md5 = this.getMD5(data);
                var output = {
                    title: option.attributes.title,
                    text: option.attributes.text,   // The text displayed on the homepage navbar
                    index: option.attributes.index,
                    md5,
                    filename
                };

                // if the file has not been changed, return
                if (this.MD5History[filename] == md5) {
                    resolve(output);
                    console.log(`[√] ${option.attributes.title} not changed.`);
                    return
                }

                // parse and generate content
                var content = marked.parse(option.body);

                // generate html according to the template
                var html = template(this.path('src/template/post.art'), {
                    type: 'page',
                    title: option.attributes.text,
                    hasCode: option.attributes.code ?? true,
                    content,
                    config: this.config
                });

                // write to file
                var theDir = this.publicDir(option.attributes.title);
                this.checkDir(theDir);
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) throw err;
                    console.log(`[√] ${option.attributes.title}`);
                });

                resolve(output);

            });

        });

    }

    compileIndex(posts, pages) {
        // sort
        posts.sort((a, b) => {
            return b.ISOString - a.ISOString;
        });
        pages.sort((a, b) => {
            return a.index - b.index;
        });

        // generate html according to the template
        var html = template(this.path('src/template/index.art'), {
            posts,
            pages,
            config: this.config
        });

        // write to file
        fs.writeFile(this.publicDir('index.html'), html, (err) => {
            if (err) throw err;
            console.log('[√] index.html');
        });

        // record MD5
        var md5 = {};
        posts.forEach(e => {
            md5[e.filename] = e.md5;
        });
        pages.forEach(e => {
            md5[e.filename] = e.md5;
        });
        fs.writeFile(this.path('md5.log'), JSON.stringify(md5), (err) => {
            if (err) throw err;
        });
    }

}