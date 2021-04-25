import locales from "../../../config/locales";
import buildConfig from "../../../config";
import { mUsefulArray } from "@/utils/convert";
import { FrameType } from "@/models/RouteType";

let lang = sessionStorage.getItem("lang");
lang = lang ? lang : "zh-CN";

let title = locales[lang] ? locales[lang] : locales["zh-CN"];

const getTitle = (key: string) => {
  return title[key] ? title[key] : key;
};

let frameConfig: FrameType = {};

const getModules = list => {
  list.forEach(item => {
    if (mUsefulArray(item.nextLink)) {
      getModules(item.nextLink);
    } else {
      if (!item.link) {
      }
    }
    let { name } = item;
    item.title = getTitle(name);
  });
};

const transformFrameConfig = () => {
  frameConfig = Object.assign(frameConfig, buildConfig);
  Object.keys(frameConfig).map(key => {
    if (mUsefulArray(frameConfig[key])) getModules(frameConfig[key]);
  });
};

transformFrameConfig();

export default frameConfig;