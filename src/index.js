import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import moment from 'moment';
import yaml from 'js-yaml';
import fm from 'front-matter';
import template from 'art-template';
import { marked } from './marked-load.js'

// dirname
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Qingya {

    constructor(blogDir = '.') {
        this.blogDir = blogDir;
        
        var file = this.rootDir('_config.yml');
        if (!fs.existsSync(file)) {
            fs.copyFile(this.path('src/_config.yml'), file, (err) => {
		        if (err) throw err;
		        console.log(`[√] copy _config.yml`);
		    });
        }
        
        this.updateConfig();
    }

    path(...dir) {
        return path.join(__dirname, '..', ...dir);
    }

    rootDir(...dir) {
        return path.join(this.blogDir, ...dir);
    }

    publicDir(...dir) {
        return path.join(this.blogDir, this.config.public_dir, ...dir);
    }

    sourceDir(...dir) {
        return path.join(this.blogDir, this.config.source_dir, ...dir);
    }

    checkDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    updateConfig() {
        this.config = yaml.load(fs.readFileSync(this.rootDir('_config.yml'), 'utf8'));
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
        var file = this.rootDir('.md5');
        if (fs.existsSync(file)) {
            this.MD5History = JSON.parse(fs.readFileSync(file, 'utf-8') || '{}');
        } else {
            this.MD5History = {};
        }
    }

    clearMD5() {
        var file = this.rootDir('.md5');
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    }

    initgit() {
        this.checkDir(this.publicDir());
        this.checkDir(this.publicDir('css'));
        this.checkDir(this.publicDir('post'));
        this.checkDir(this.rootDir('posts'));
        this.checkDir(this.rootDir('pages'));

        var opt = this.config.deploy;
        execSync([
            `cd ${this.publicDir()}`,
            'git init',
            `git remote add origin "${opt.repository}"`,
        ].join('&&'));
        console.log('[√] git is initialized');
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
        console.log('[√] Deploying to git is finished');
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

    newPost() {
        this.updateConfig();

        const date = (new Date).toISOString();
        const theDir = this.sourceDir(`posts/${date}`);
        this.checkDir(theDir);
        fs.writeFile(`${theDir}/${date}.md`,
`---
title: ${date}
date: ${date}
cover: static/pics/cover/${date}.png
code: false
---

`, (err) => {
            if (err) throw err;
        });
    }

    generate() {
        this.updateConfig();
        this.copyCSS();

        // traverse and compile posts
        var posts = fs.readdirSync(this.sourceDir('posts')).map(filename => this.compilePost(filename));

        // traverse and compile pages
        var pages = fs.readdirSync(this.sourceDir('pages')).map(filename => this.compilePage(filename));

        // compile index.html
        this.compileIndex(posts, pages);
    }

    compilePost(postDir) {
        // base url
        marked.use({
            baseUrl: `${this.config.cdn}/posts/${postDir}/`
        });

        // find and read markdown file
        const filename = fs.readdirSync(this.sourceDir('posts', postDir)).find(e => path.extname(e) == '.md');
        const markdown = fs.readFileSync(this.sourceDir('posts', postDir, filename), 'utf8');

        // parse the yaml of the header
        const { attributes, body } = fm(markdown);

        // date of post
        const date = moment(attributes.date).utc().format(this.getDateFormat());

        // check whether the file has been changed by MD5
        const md5 = this.getMD5(markdown);
        const output = {
            title: attributes.title,
            cover: attributes.cover,
            ISOString: attributes.date,
            date,
            md5,
            filename
        };

        // if the file has not been changed, return
        if (this.MD5History[filename] == md5) {
            console.log(`[√] ${attributes.title} (not changed)`);
            return output;
        }

        // parse and generate content
        const content = marked.parse(body);

        // generate html according to the template
        const html = template(this.path('src/template/post.art'), {
            type: 'post',
            title: attributes.title,
            date,
            hasCode: attributes.code ?? true,
            content,
            config: this.config
        });

        console.log(`[√] ${attributes.title}`);

        // write to file
        const theDir = this.publicDir('post', attributes.title);
        this.checkDir(theDir);
        fs.writeFile(theDir + '/index.html', html, (err) => {
            if (err) throw err;
        });

        return output;
    }

    compilePage(pageDir) {
        // base url
        marked.use({
            baseUrl: `${this.config.cdn}/pages/${pageDir}/assets/`
        });

        // find and read markdown file
        const filename = fs.readdirSync(this.sourceDir('pages', pageDir)).find(e => path.extname(e) == '.md');
        const data = fs.readFileSync(this.sourceDir('pages', pageDir, filename), 'utf8');

        // parse the yaml of the header
        const { attributes, body } = fm(data);

        // check whether the file has been changed by MD5
        const md5 = this.getMD5(data);
        const output = {
            title: attributes.title,
            text: attributes.text,   // The text displayed on the homepage navbar
            index: attributes.index,
            md5,
            filename
        };

        // if the file has not been changed, return
        if (this.MD5History[filename] == md5) {
            console.log(`[√] ${attributes.title} (not changed)`);
            return output;
        }

        // parse and generate content
        const content = marked.parse(body);

        // generate html according to the template
        const html = template(this.path('src/template/post.art'), {
            type: 'page',
            title: attributes.text,
            hasCode: attributes.code ?? true,
            content,
            config: this.config
        });

        console.log(`[√] ${attributes.title}`);

        // write to file
        const theDir = this.publicDir(attributes.title);
        this.checkDir(theDir);
        fs.writeFile(theDir + '/index.html', html, (err) => {
            if (err) throw err;
        });

        return output;
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
        fs.writeFile(this.rootDir('.md5'), JSON.stringify(md5), (err) => {
            if (err) throw err;
        });
    }

}
