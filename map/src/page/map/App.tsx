import React from "react";
import Map from "@/components/map/Map";
import "./app.scss";
import {formatDataV2} from "@/components/map/format";

export const App: React.FC = () => {
  let data = {
    "config": {
      "chart_key": "",
      "have_filter": false,
      "have_sort": false,
      "have_tab": false,
      "headers": [
        "能耗",
        "工厂"
      ],
      "type": 0,
      "units": [],
      "page_info": {
        "no": 1,
        "size": 30,
        "total": 0
      },
      "zheaders":[]
    },
    "data": [
      {
        "data": [
          {
            "b_name": "北京市",
            "b_data": [
              "1680",
              "捷诚***工厂"
            ]
          },
          {
            "b_name": "甘肃省",
            "b_data": [
              "230",
              "巴斯***工厂"
            ]
          },
          {
            "b_name": "广西省",
            "b_data": [
              "2235",
              "机械***工厂"
            ]
          },
          {
            "b_name": "广州省",
            "b_data": [
              "1920",
              "航空***工厂"
            ]
          },
          {
            "b_name": "河北省",
            "b_data": [
              "995",
              "三鑫***工厂"
            ]
          },
          {
            "b_name": "湖北省",
            "b_data": [
              "2100",
              "欧克***工厂"
            ]
          },
          {
            "b_name": "湖南省",
            "b_data": [
              "225",
              "航天***工厂"
            ]
          },
          {
            "b_name": "内蒙古自治区",
            "b_data": [
              "2205",
              "三道***工厂"
            ]
          },
          {
            "b_name": "上海市",
            "b_data": [
              "770",
              "市人***工厂"
            ]
          },
          {
            "b_name": "四川省",
            "b_data": [
              "115",
              "中秧***工厂"
            ]
          },
          {
            "b_name": "天津市",
            "b_data": [
              "785",
              "速成***工厂"
            ]
          },
          {
            "b_name": "重庆市",
            "b_data": [
              "171",
              "慧格***工厂"
            ]
          }
        ],
        "name": ""
      }
    ]
  };
  return <Map data={formatDataV2(data)?.data[0] || []}/>;
};