const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const moment = require('moment');
const yaml = require('js-yaml');
const fm = require('front-matter');
const marked = require('./markdown/marked');
const template = require('art-template');

module.exports = class qingya {

    constructor() {
        this.rootDir = __dirname;
        this.loadConfig();
    }

    path(...dir) {
        return path.join(this.rootDir, ...dir);
    }

    loadConfig() {
        this.config = yaml.safeLoad(fs.readFileSync(this.path('../_config.yml'), 'utf8'));
    }

    getDateFormat() {
        return this.config.date_format + ' ' + this.config.time_format;
    }

    getMD5(str) {
        return crypto.createHash('md5').update(str, 'utf8').digest('hex');
    }

    parseMD5() {
        var file = this.path('../md5.log');
        if (fs.existsSync(file)) {
            this.MD5History = JSON.parse(fs.readFileSync(file));
        } else {
            this.MD5History = {};
        }
    }

    clearMD5() {
        var file = this.path('../md5.log');
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    }

    initgit() {
        var cwd = this.rootDir;
        var opt = this.config.deploy;
        execSync([
            `cd ${this.path('../public/')}`,
            'git init',
            `git remote add origin "${opt.repository}"`,
        ].join('&&'), { cwd, stdio: 'inherit' });
        console.log('[✅] git is initialized.');
    }

    deploygit(commit) {
        var cwd = this.rootDir;
        var opt = this.config.deploy;
        execSync([
            `cd ${this.path('../public/')}`,
            `git config user.email "${opt.user_email}"`,
            `git config user.name "${opt.user_name}"`,
            'git add .',
            `git commit --allow-empty -m "${commit}"`,
            `git push -u origin ${opt.branch}`
        ].join('&&'), { cwd, stdio: 'inherit' });
        console.log('[✅] Deploying to git is finished.');
    }

    pushgit() {
        var cwd = this.rootDir;
        execSync('git push', { cwd, stdio: 'inherit' });
    }

    generate() {

        // 更新配置
        this.loadConfig();
        this.parseMD5();

        // 压缩 HTML、JS、CSS
        template.defaults.minimize = this.config.minimize;

        var posts = [];
        var pages = [];

        // 遍历
        fs.readdir(this.path('..', this.config.source_dir, 'posts'), async (err, filenames) => {

            if (err) {
                throw err;
            }

            // 遍历，编译post
            for (let filename of filenames) {
                posts.push(await this.compilePost(filename));
            }

            // 遍历page
            const pagefilenames = fs.readdirSync(this.path('..', this.config.source_dir));
            for (let filename of pagefilenames.slice(0, -1)) {
                pages.push(await this.compilePage(filename));
            }

            // 生成index.html
            this.compileIndex(posts, pages);

        });

    }

    compilePost(filename) {

        return new Promise((resolve, reject) => {

            // 拼接出完整的文件路径
            const file = this.path('..', this.config.source_dir, 'posts', filename);

            // 读取文件
            fs.readFile(file, 'utf8', (err, data) => {

                if (err) {
                    throw err;
                }

                // 解析头部的yaml
                const option = fm(data);

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
                    return
                }

                // 解析正文，生成content
                const content = marked.parse(option.body);

                // 根据模板生成html
                const html = template(this.path('template/post.art'), {
                    type: 'post',
                    title: option.attributes.title,  // 标题
                    date,                            // 日期
                    hasMath: option.attributes.math, // 是否有数学公式
                    hasCode: true,                   // 是否有代码
                    content,                         // 正文
                    config: this.config
                });

                // 写入文件
                var theDir = this.path('..', this.config.public_dir, 'post', option.attributes.title);
                fs.mkdir(theDir, (err) => { });
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('[✅] ' + option.attributes.title);
                });

                // 输出
                resolve(output);

            });

        });

    }

    compilePage(filename) {

        return new Promise((resolve, reject) => {

            // 拼接出完整的文件路径
            const file = this.path('..', this.config.source_dir, filename);

            // 读取文件
            fs.readFile(file, 'utf8', (err, data) => {

                if (err) {
                    throw err;
                }

                // 解析头部的yaml
                const option = fm(data);

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
                    return
                }

                // 解析正文，生成content
                const content = marked.parse(option.body);

                // 根据模板生成html
                const html = template(this.path('template/post.art'), {
                    type: 'page',
                    title: option.attributes.text,  // 标题
                    hasMath: option.attributes.math, // 是否有数学公式
                    hasCode: false,                  // 是否有代码
                    content,                         // 正文
                    config: this.config
                });

                // 写入文件
                var theDir = this.path('..', this.config.public_dir, option.attributes.title);
                fs.mkdir(theDir, (err) => { });
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('[✅] ' + option.attributes.title);
                });

                // 输出
                resolve(output);

            });

        });

    }

    compileIndex(posts, pages) {

        // 排序
        posts.sort((a, b) => {
            return b.ISOString - a.ISOString
        });
        pages.sort((a, b) => {
            return a.index - b.index
        });

        // 根据模板生成html
        const html = template(this.path('template/index.art'), {
            posts,
            pages,
            config: this.config
        });

        // 写入文件
        fs.writeFile(this.path('..', this.config.public_dir, 'index.html'), html, (err) => {
            if (err) {
                throw err;
            }
            console.log('[✅] index.html');
        });

        // 记录MD5
        var md5 = {};
        for (let post of posts) {
            md5[post.filename] = post.md5;
        }
        for (let page of pages) {
            md5[page.filename] = page.md5;
        }
        fs.writeFile(this.path('../md5.log'), JSON.stringify(md5), (err) => {
            if (err) {
                throw err;
            }
        });

    }

}