import { cleanUrl } from '../node_modules/marked/src/helpers.js'

const extBlock = (options) => ({
  name: 'video',
  level: 'block',
  start(src) {
    return src.match(/!\[\[/)?.index ?? -1;
  },
  tokenizer(src, tokens) {
    const match = /^!\[\[(.+?)\]\]/.exec(src);
    return match ? {
      type: 'video',
      raw: match[0],
      src: match[1]
    } : undefined;
  },
  renderer(token) {
    const href = cleanUrl(this.parser.options.sanitize, this.parser.options.baseUrl, token.src);
    if (href === null) {
      return text;
    }
    return `<center><video src="${href}" controls autoplay loop muted>your browser does not support the video tag</video></center>`;
  }
});

export default (options = {}) => {
  return {
    extensions: [extBlock(options)]
  };
};