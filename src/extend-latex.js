const extBlock = (options) => ({
  name: 'latex-block',
  level: 'block',
  start(src) {
    return src.match(/\$\$[^\$]/)?.index ?? -1;
  },
  tokenizer(src, tokens) {
    const match = /^\$\$([^\$]+)\$\$/.exec(src);
    return match ? {
      type: 'latex-block',
      raw: match[0],
      formula: match[1]
    } : undefined;
  },
  renderer(token) {
    return options.render(token.formula, true);
  }
});

const extInline = (options) => ({
  name: 'latex',
  level: 'inline',
  start(src) {
    return src.match(/\$[^\$]/)?.index ?? -1;
  },
  tokenizer(src, tokens) {
    const match = /^\$([^\$]+)\$/.exec(src);
    return match ? {
      type: 'latex',
      raw: match[0],
      formula: match[1]
    } : undefined;
  },
  renderer(token) {
    return options.render(token.formula, false);
  }
});

export default (options = {}) => {
  return {
    extensions: [extBlock(options), extInline(options)]
  };
};