const { defaults } = require('./defaults.js');
const {
  cleanUrl,
  escape
} = require('./helpers.js');
const hljs = require('highlight.js');

/**
 * Renderer
 */
module.exports = class Renderer {

  constructor(options) {
    this.options = options || defaults;
  }

  code(code, infostring, escaped) {

    // 提取lang
    const lang = (infostring || '').match(/\S*/)[0];

    // 如果lang为空，返回以下内容
    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape(code, true))
        + '</code></pre>\n';
    }

    // 语法高亮
    if (this.options.highlight) {
      // 调用hljs.highlight
      const out = hljs.highlight(code, {
        language: lang
      }).value;
      // 进一步处理
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    // 如果以\n结束，还以\n结束。如果不以\n结束，则以\n结束
    code = code.replace(/\n$/, '') + '\n';

    return '<pre data-lang="'
      + escape(lang, true)
      + '"><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>\n';

  }

  blockquote(quote, flag) {
    switch (flag) {
      case '>': {
        return '<blockquote>\n' + quote + '</blockquote>\n';
      }
      case '?>': {
        return '<div class="warn">\n' + quote + '</div>\n';
      }
      case '!>': {
        return '<div class="tip">\n' + quote + '</div>\n';
      }
    }
    
  }

  html(html) {
    return html.replace(/\n/, '');
  }

  heading(text, level) {
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  }

  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  }

  list(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  }

  listitem(text) {
    return '<li>' + text + '</li>\n';
  }

  checkbox(checked) {
    return '<input '
      + (checked ? 'checked="" ' : '')
      + 'disabled="" type="checkbox"'
      + (this.options.xhtml ? ' /' : '')
      + '> ';
  }

  paragraph(text) {
    return '<p>' + text + '</p>\n';
  }

  table(header, body) {
    return `<div class="table-box"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
  }

  tablerow(content) {
    return '<tr>\n' + content + '</tr>\n';
  }

  tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td';
    const tag = flags.align
      ? '<' + type + ' align="' + flags.align + '">'
      : '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  }

  // span level renderer
  strong(text) {
    return '<strong>' + text + '</strong>';
  }

  em(text) {
    return '<em>' + text + '</em>';
  }

  codespan(text) {
    return '<code>' + text + '</code>';
  }

  br() {
    return this.options.xhtml ? '<br/>' : '<br>';
  }

  del(text) {
    return '<del>' + text + '</del>';
  }

  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape(href) + '" target="_blank"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  }

  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }

    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  }

  text(text) {
    return text;
  }

  latex(tex, display) {
    const svg = this.tex2svgUseMathJax(tex, display);
    return '<span class="mjx-' + (display ? 'display' : 'inline') + '">' + svg + '</span>';
  }

};


/**
 * 给Renderer类添加tex2htmlUseMathJax()方法
 */
require('mathjax').init({
  loader: {
    load: ['input/tex', 'output/svg', '[tex]/extpfeil']
  },
  tex: {
    packages: {'[+]': ['extpfeil']}
  },
  svg: {
    fontCache: 'global'
  }
}).then(MathJax => {
  // 把MathJax对象保存成Renderer的属性。module.exports其实就是Renderer类
  module.exports.prototype.MathJax = MathJax;

  // 给Renderer添加getSVGfontCache()方法，用来获取svg的fontCache
  module.exports.prototype.getSVGfontCache = function() {
    // 获取fontCache
    const cache = this.MathJax.startup.output.fontCache.getCache();
    // 如果cache有子节点，才需要进一步获取
    if (this.MathJax.startup.adaptor.firstChild(cache)) {
      // 清空fontCache
      this.MathJax.startup.output.fontCache.clearCache();
      // cache变量是<defs>节点，需要转为文本形式，并用<svg>标签包裹，然后返回
      return '<svg style="display: none" id="MJX-SVG-global-cache">'
           + this.MathJax.startup.adaptor.outerHTML(cache)
           + '</svg>';
    }
    // 默认返回空字符
    return '';
  };

  // 给Renderer添加tex2svgUseMathJax()方法
  module.exports.prototype.tex2svgUseMathJax = function(tex, display) {
    const svg = this.MathJax.tex2svg(tex, {
      display
    });
    return this.MathJax.startup.adaptor.outerHTML(svg);
 }
}).catch(err => {throw err});