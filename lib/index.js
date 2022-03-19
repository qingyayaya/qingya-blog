const fs = require('fs');
const path = require('path');
const moment = require('moment');
const yaml = require('js-yaml');
const fm = require('front-matter');
const marked = require('./markdown/marked');
const template = require('art-template');

// 压缩 HTML、JS、CSS
template.defaults.htmlMinifierOptions = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    // 运行时自动合并：rules.map(rule => rule.test)
    ignoreCustomFragments: []
};

module.exports = class qingya {

    constructor() {
        this.rootDir = __dirname;
    }

    path(...file) {
        return path.join(this.rootDir, ...file);
    }

    loadConfig() {
        // 读取配置
        this.config = yaml.safeLoad( fs.readFileSync(this.path('../_config.yml'),'utf8') );
    }

    getDateFormat() {
        return this.config.date_format + ' ' + this.config.time_format;
    }

    minifier() {
        
    }

    generate() {

        // 更新配置
        this.loadConfig();

        var posts = [];
        var pages = [];
    
        // 遍历
        fs.readdir(this.path('..',this.config.source_dir,'posts'), async (err, files) => {
    
            if (err) {
                throw err;
            }
    
            // 遍历，编译post
            for (let file of files) {
                posts.push( await this.compilePost(file) );
            }
    
            // 遍历page
            const pagefiles = fs.readdirSync( this.path('..',this.config.source_dir) );
            for (let file of pagefiles.slice(0,pagefiles.length-1)) {
                pages.push( await this.compilePage(file) );
            }
    
            // 生成index.html
            this.compileIndex(posts, pages);
    
        });
    
    }

    compilePost(filename) {

        return new Promise((resolve, reject) => {

            // 拼接出完整的文件路径
            const file = this.path('..',this.config.source_dir,'posts',filename);
        
            // 读取文件
            fs.readFile(file, 'utf8', (err, data) => {
    
                if (err) {
                    throw err;
                }
    
                // 解析头部的yaml
                const option = fm(data);
                
                // 解析正文，生成content
                const content = marked.parse(option.body);
    
                // post的日期
                var date = moment(option.attributes.date).utc().format( this.getDateFormat() );
    
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
                fs.mkdir(theDir, (err) => {});
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('[✅] ' + option.attributes.title);
                });
    
                // 输出
                resolve({
                    title: option.attributes.title,
                    cover: option.attributes.cover,  // 封面
                    ISOString: option.attributes.date,
                    date
                });
    
            });
    
        });
    
    }

    compilePage(filename) {
    
        return new Promise((resolve, reject) => {

            // 拼接出完整的文件路径
            const file = this.path('..',this.config.source_dir,filename);
            
            // 读取文件
            fs.readFile(file, 'utf8', (err, data) => {
    
                if (err) {
                    throw err;
                }
    
                // 解析头部的yaml
                const option = fm(data);
                
                // 解析正文，生成content
                const content = marked.parse(option.body);
    
                // 根据模板生成html
                const html = template(this.path('template/post.art'), {
                    type: 'page',
                    title: option.attributes.title,  // 标题
                    hasMath: option.attributes.math, // 是否有数学公式
                    hasCode: false,                  // 是否有代码
                    content,                         // 正文
                    config: this.config
                });
    
                // 写入文件
                var theDir = this.path('..', this.config.public_dir, option.attributes.title);
                fs.mkdir(theDir, (err) => {});
                fs.writeFile(theDir + '/index.html', html, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('[✅] ' + option.attributes.title);
                });
    
                // 输出
                resolve({
                    title: option.attributes.title,
                    text:  option.attributes.text,   // 显示在首页navbar的文字
                    index: option.attributes.index,  // 次序
                });
    
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
            posts: posts,
            pages: pages,
            config: this.config
        });
    
        // 写入文件
        fs.writeFile(this.path('..', this.config.public_dir, 'index.html'), html, (err) => {
            if (err) {
                throw err;
            }
            console.log('[✅] index.html');
        });
    
    }

}