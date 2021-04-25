import axios, { AxiosError } from "axios";
import env from "@/constants/env.json";
import { compareObj, getCurrentPage, getSecretParams, objectToParamstr, paramstrToObject } from "@/utils/convert";
import mock from "@/service/mock";

let limitTime = 1000;
let startTime = 0;
let tempParams = {};

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const http = axios.create({
  timeout: 10000
});

// 添加请求拦截器
http.interceptors.request.use(async config => {
  let token = localStorage.getItem("token");

  let { params = {}, data = {}, url } = config;
  config.cancelToken = source.token;

  let currentTime = new Date().getTime();
  let obj = Object.assign({ url }, params, data);
  if (currentTime - startTime < limitTime && compareObj(obj, tempParams)) {
    source.cancel("操作太频繁,请稍后再试");
  } else {
    tempParams = obj;
    config.cancelToken = undefined;
  }
  startTime = currentTime;

  config.headers.Authorization = `Token ${token}`;

  let defaultParams = {
    client_id: env.clientId,
    ts: new Date().getTime()
  };
  Object.assign(params, defaultParams);
  let { urlParams } = getSecretParams(params);
  config.params = urlParams;

  if (env.env === "mock") {
    mock(config);
  }
  return config;
}, async (err: AxiosError) => {
  return Promise.reject(err);
});

let canGetToken: boolean = true;

// 添加响应拦截器
http.interceptors.response.use(
  async res => {
    let { data, config } = res;
    switch (data.code) {
      case 305:
        let search = window.location.search;

        if (search) {
          let obj: any = paramstrToObject(search);
          if (obj["code"]) {
            try {
              canGetToken && (await getToken({ code: obj['code'] }));
            } catch (e) {
              login();
            }
          }
        } else {
          login();
        }
        break;
      case 200:
        if (config.url && config.url.includes("1/appcockpit/getToken")) {
          canGetToken = true;
          localStorage.setItem("token", res.data.data);
          let { preUrl, currentPage } = getCurrentPage();
          window.location.href = preUrl + currentPage;
          //window.location.reload();
        }
        break;
      default:
        throw res.data;
    }
    return res;
  },
  async (err: AxiosError) => {
    // let { response, request } = err;
    // if (!response) return Toast.show('服务已走丢！请稍后再试');
    return Promise.reject(err);
  }
);

export function getToken(params: {
  /** code */
  code: string;
}): Promise<string> {
  canGetToken = false;
  let tokenUrl = "http://eoss.mst.casicloud.com/1/appcockpit/getToken";
  if (env.env.startsWith("prod")) {
    tokenUrl = tokenUrl.replace(".mst.", ".ms.").replace("http://", "https://");
  }
  return http.get(tokenUrl, { params }).then(res => res.data.data);
}

function getLogParams(isLogin: boolean) {
  let defaultParams = {
    client_id: env.clientId,
    ts: new Date().getTime()
  };

  let search = window.location.search;
  let temp = "";
  if (search) {
    let obj: any = paramstrToObject(search);
    if (obj["code"]) {
      temp = `code=${obj["code"]}`;
    }
  }
  let tpage = window.location.href.replace(temp, "");
  if (tpage.endsWith("?")) tpage = tpage.substring(0, tpage.length - 1);

  isLogin ? Object.assign(defaultParams, { tpage }) : Object.assign(defaultParams, { ret: tpage });
  let { objParams } = getSecretParams(defaultParams);
  return objectToParamstr(objParams);
}

export function login() {
  localStorage.clear();
  window.location.href = `${env.login}?${getLogParams(true)}`;
}

export function logout() {
  localStorage.clear();
  window.location.href = `${env.logout}?${getLogParams(false)}`;
}

export default http;