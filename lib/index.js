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

    updateConfig() {
        this.config = yaml.safeLoad(fs.readFileSync(this.path('_config.yml'), 'utf8'));
        this.parseMD5();
        template.defaults.minimize = this.config.minimize; // 压缩 HTML、JS、CSS
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
        var dir = this.path(this.config.public_dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        var postDir = path.join(dir, 'post');
        if (!fs.existsSync(postDir)) {
            fs.mkdirSync(postDir);
        }

        var opt = this.config.deploy;
        execSync([
            `cd ${this.path(this.config.public_dir)}`,
            'git init',
            `git remote add origin "${opt.repository}"`,
        ].join('&&'));
        console.log('[✅] git is initialized.');
    }

    deploygit(massage) {
        var opt = this.config.deploy;
        execSync([
            `cd ${this.path(this.config.public_dir)}`,
            `git config user.email "${opt.user_email}"`,
            `git config user.name "${opt.user_name}"`,
            'git add .',
            `git commit --allow-empty -m "${massage}"`,
            `git push -u origin ${opt.branch}`
        ].join('&&'));
        console.log('[✅] Deploying to git is finished.');
    }

    pushgit() {
        execSync([
            `cd ${this.path(this.config.public_dir)}`,
            'git push'
        ].join('&&'));
    }

    copyCSS() {
        var destDir = this.path(this.config.public_dir, 'css');
        var srcDir = this.path('lib/css');

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }

        fs.readdir(srcDir, 'utf8', (err, filename) => {
            if (err) throw err;
            filename.forEach(e => {
                fs.copyFile(path.join(srcDir, e), path.join(destDir, e), (err) => {
                    if (err) throw err;
                    console.log(`[✅] copy ${e}`);
                });
            });
        });
    }

    async generate() {
        // 更新配置
        this.updateConfig();

        this.copyCSS();

        // 遍历，编译post
        var posts = [];
        var postFilenames = fs.readdirSync(this.path(this.config.source_dir, 'posts'));
        for (let filename of postFilenames) {
            posts.push(await this.compilePost(filename));
        }

        // 遍历，编译page
        var pages = [];
        var pageFilenames = fs.readdirSync(this.path(this.config.source_dir)).slice(0, -1);
        for (let filename of pageFilenames) {
            pages.push(await this.compilePage(filename));
        }

        // 生成index.html
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

            var file = this.path(this.config.source_dir, 'posts', filename);

            // 读取文件
            fs.readFile(file, 'utf8', (err, data) => {

                if (err) throw err;

                // 解析头部的yaml
                var option = fm(data);

                // post的日期
                var date = moment(option.attributes.date).utc().format(this.getDateFormat());

                // MD5校验该文件是否被改动过
                var md5 = this.getMD5(data);
                var output = {
                    title: option.attributes.title,
                    cover: option.attributes.cover,
                    ISOString: option.attributes.date,
                    date,
                    md5,
                    filename
                };

                // 若文件没被改动过，就可以返回了
                if (this.MD5History[filename] == md5) {
                    resolve(output);
                    console.log(`[✅] ${option.attributes.title} not changed.`);
                    return
                }

                // 解析正文，生成content
                var content = marked.parse(option.body);

                // 根据模板生成html
                var html = template(this.path('lib/template/post.art'), {
                    type: 'post',
                    title: option.attributes.title,          // 标题
                    date,                                    // 日期
                    hasCode: option.attributes.code ?? true, // 是否有代码
                    content,                                 // 正文
                    config: this.config
                });

                // 写入文件
                var theDir = this.path(this.config.public_dir, 'post', option.attributes.title);
                fs.mkdir(theDir, (err) => { });
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) throw err;
                    console.log(`[✅] ${option.attributes.title}`);
                });

                resolve(output);

            });

        });

    }

    compilePage(filename) {

        return new Promise((resolve, reject) => {

            var file = this.path(this.config.source_dir, filename);

            // 读取文件
            fs.readFile(file, 'utf8', (err, data) => {

                if (err) throw err;

                // 解析头部的yaml
                var option = fm(data);

                // MD5校验该文件是否被改动过
                var md5 = this.getMD5(data);
                var output = {
                    title: option.attributes.title,
                    text: option.attributes.text,   // 显示在首页navbar的文字
                    index: option.attributes.index,  // 次序
                    md5,
                    filename
                };

                // 若文件没被改动过，就可以返回了
                if (this.MD5History[filename] == md5) {
                    resolve(output);
                    console.log(`[✅] ${option.attributes.title} not changed.`);
                    return
                }

                // 解析正文，生成content
                var content = marked.parse(option.body);

                // 根据模板生成html
                var html = template(this.path('lib/template/post.art'), {
                    type: 'page',
                    title: option.attributes.text,           // 标题
                    hasCode: option.attributes.code ?? true, // 是否有代码
                    content,                                 // 正文
                    config: this.config
                });

                // 写入文件
                var theDir = this.path(this.config.public_dir, option.attributes.title);
                fs.mkdir(theDir, (err) => { });
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) throw err;
                    console.log(`[✅] ${option.attributes.title}`);
                });

                resolve(output);

            });

        });

    }

    compileIndex(posts, pages) {
        // 排序
        posts.sort((a, b) => {
            return b.ISOString - a.ISOString;
        });
        pages.sort((a, b) => {
            return a.index - b.index;
        });

        // 根据模板生成html
        var html = template(this.path('lib/template/index.art'), {
            posts,
            pages,
            config: this.config
        });

        // 写入文件
        var theDir = this.path(this.config.public_dir, 'index.html');
        fs.writeFile(theDir, html, (err) => {
            if (err) throw err;
            console.log('[✅] index.html');
        });

        // 记录MD5
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