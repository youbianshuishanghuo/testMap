import md5 from "blueimp-md5";
import env from "@/constants/env.json";

export function getSecretParams(params: any = {}) {
  let paramStr = "";
  let objParams: any = {};
  const urlParams = new URLSearchParams();
  Object.keys(params)
    .sort()
    .filter(k => k !== "sign")
    .forEach(key => {
      paramStr += `${key}=${encodeURIComponent(params[key])}`;
      objParams[key] = params[key];
      urlParams.set(key, params[key]);
    });
  let sign = md5(paramStr + env.clientSecret);
  objParams.sign = sign;
  urlParams.set("sign", sign);
  return {objParams, urlParams};
}

export function objectToParamstr(Object: any = {}) {
  let paramStr = "";
  for (let key in Object) {
    if (Object.hasOwnProperty(key)) {
      paramStr += `${key}=${encodeURIComponent(Object[key])}&`;
    }
  }
  if (paramStr.endsWith("&")) paramStr = paramStr.substr(0, paramStr.length - 1);
  return paramStr;
}

export function paramstrToObject(str: string) {
  if (str.startsWith("?")) {
    str = str.substr(1, str.length);
  }
  let obj = {};
  let array = str.split("&");
  array.forEach(item => {
    let split = item.split("=");
    obj[split[0]] = split[1] ? split[1] : "";
  });
  return obj;
}

export function getCurrentPage() {
  let split = window.location.pathname.replace("/index.html", "").split("/");
  split = split.filter(value => value !== "" && value !== null);
  let currentPage = split[split.length - 1] ? split[split.length - 1] : "";
  let preUrl = window.location.href.split(currentPage)[0];
  return { currentPage, preUrl };
}

export const mUsefulArray = array => {
  return array && Array.isArray(array) && array.length > 0;
};

export function compareObj(orgObj: any, comObj: any) {
  let result = true;
  Object.keys(orgObj).forEach(key => {
    if (!comObj.hasOwnProperty(key) || orgObj[key] !== comObj[key]) {
      result = false;
    }
  });
  return result;
}