import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { Header } from "@/components/header";
import { Slider } from "@/components/slider";
import { AppProvider } from "@/service/AppProvider";
import { LoadingPage } from "@/components/loading";
import intl from "react-intl-universal";
import locales from "../../../config/locales";
import { themeColors } from "@/style/color";
import { stores } from "@/stores";
import moment from "moment";
import "moment/locale/zh-cn";
import "@/style/theme/darkTheme.less";
import "@/style/theme/lightTheme.less";

export const FrameContainer: React.FC = props => {
  const { Content } = Layout;
  let [initDone, setInitDone] = useState(false);
  let lang = useMemo(() => sessionStorage.getItem("lang") || "zh-CN", []);

  useEffect(() => {
    intl.init({
      currentLocale: !lang.startsWith("zh") ? lang : "zh-CN",
      locales
    })
      .then(() => {
        setInitDone(true);
        moment.locale(!lang.startsWith("zh") ? lang : "zh-CN");
      });
  }, [lang]);

  return (initDone ?
      <AppProvider providers={stores}>
        <ConfigProvider locale={!lang.startsWith("zh") ? enUS : zhCN}>
          <Layout style={{ minWidth: "1280px", height: "100%" }}>
            <Header/>
            <Layout>
              <Content style={style} id={"frame-content"}>
                {props.children}
              </Content>
            </Layout>
          </Layout>
        </ConfigProvider>
      </AppProvider> : <LoadingPage/>
  );
};

let style = {
  background: themeColors.contentBg,
  padding: 24,
  margin: 0,
  minHeight: 280
};