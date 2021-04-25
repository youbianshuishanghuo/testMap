const buildConfig = require("./index");
const locales = require("./locales");

let modules = [];

const mUsefulArray = array => {
  return array && Array.isArray(array) && array.length > 0;
};

const getModules = list => {
  list.forEach(item => {
    if (mUsefulArray(item.nextLink)) {
      getModules(item.nextLink);
    } else {
      if (!item.link) {
        let { name } = item;
        let title = locales["zh-CN"] && locales["zh-CN"][name] ? locales["zh-CN"][name] : name;
        modules.push({ name, title });
      }
    }
  });
};

Object.keys(buildConfig).map(key => {
  if (mUsefulArray(buildConfig[key])) getModules(buildConfig[key]);
});

module.exports = modules;