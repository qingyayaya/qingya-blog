import { marked } from 'marked';
import { escape, cleanUrl } from '../node_modules/marked/src/helpers.js'
import { HighlightJS } from 'highlight.js'
import pkg from 'mathjax';
import extendedLatex from './extend-latex.js';
import extendedVideo from './extend-video.js';

/* LaTeX */

MathJax = await pkg.init({
  loader: {
    load: ['input/tex', 'output/svg', '[tex]/extpfeil']
  },
  tex: {
    packages: { '[+]': ['extpfeil'] }
  },
  svg: {
    fontCache: 'global'
  }
});

MathJax.getSVGfontCache = function () {
  // get fontCache
  const cache = this.startup.output.fontCache.getCache();

  // only if cache has child nodes, further operation is required
  if (this.startup.adaptor.firstChild(cache)) {
    // clear fontCache
    this.startup.output.fontCache.clearCache();
    // cache is <defs>, which needs to be converted to text, wrapped with <svg> tags, and then returned
    return `<svg style="display: none" id="MJX-SVG-global-cache">${this.startup.adaptor.outerHTML(cache)}</svg>`;
  }

  // return null string by default
  return '';
}

MathJax.tex2svgOuterHTML = function (tex, display) {
  const svg = this.tex2svg(tex, {
    display
  });

  return this.startup.adaptor.outerHTML(svg);
}

marked.use(extendedLatex({
  render: (formula, displayMode) => MathJax.tex2svgOuterHTML(formula, displayMode)
}));

/* video */

marked.use(extendedVideo());

/* hooks */

const hooks = {
  postprocess(html) {
    return html + MathJax.getSVGfontCache();
  }
};

marked.use({ hooks });

/* option */

const admonition_types = [
  'ad-abstract',
  'ad-attention',
  'ad-bug',
  'ad-caution',
  'ad-danger',
  'ad-error',
  'ad-example',
  'ad-failure',
  'ad-hint',
  'ad-info',
  'ad-note',
  'ad-question',
  'ad-quote',
  'ad-success',
  'ad-tip',
  'ad-warning'
];

const renderer = {
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }

    let out = `<center><img src="${href}"`;
    if (isNaN(Number(text, 10))) {
      out += ` alt="${text}"`;
    } else {
      out += ` width="${text}"`;
    }

    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? '/>' : '>' + '</center>';
    return out;
  },

  code(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];

    if (admonition_types.includes(lang)) {
      return `<div class="${lang}">${marked.parse(code)}</div>`;
    }

    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    code = code.replace(/\n$/, '') + '\n';

    if (!lang) {
      return `<pre><code>${escaped ? code : escape(code, true)}</code></pre>\n`;
    }

    return `<pre data-lang="${escape(lang, true)}"><code class="${this.options.langPrefix}${escape(lang)}">${escaped ? code : escape(code, true)}</code></pre>\n`;
  }
};

marked.use({
  renderer,
  highlight: function (code, lang) {
    const language = HighlightJS.getLanguage(lang) ? lang : 'plaintext';
    return HighlightJS.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-'
});

export { marked };
