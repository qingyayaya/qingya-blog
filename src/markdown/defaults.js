function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    highlight: true,
    mangle: true,
    sanitize: false,
    sanitizer: null,
    smartLists: false,
    smartypants: false,
    xhtml: false
  };
}

function changeDefaults(newDefaults) {
  module.exports.defaults = newDefaults;
}

module.exports = {
  defaults: getDefaults(),
  getDefaults,
  changeDefaults
};
