window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

function getLang (available, default_lang) {
  let language = (window.navigator.userLanguage || window.navigator.language).split('-')[0];
  return available[language] || default_lang
}
