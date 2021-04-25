import {AxiosRequestConfig} from "axios";

const mock = (config: AxiosRequestConfig) => {
  let pageParams = {
    _page: "",
    _limit: ""
  };
  let {params = {}} = config;
  if (params.hasOwnProperty("page_index")) {
    pageParams._page = params["page_index"];
  }
  if (params.hasOwnProperty("pageIndex")) {
    pageParams._page = params["pageIndex"];
  }
  if (params.hasOwnProperty("pageNum")) {
    pageParams._page = params["pageNum"];
  }
  if (params.hasOwnProperty("page_size")) {
    pageParams._limit = params["page_size"];
  }
  if (params.hasOwnProperty("pageSize")) {
    pageParams._limit = params["pageSize"];
  }
  config.params = pageParams;
};

export default mock;