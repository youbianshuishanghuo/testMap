import React, { useContext, useState } from "react";
import { Icon, Layout, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import { frameConfig } from "@/components/frame";
import { getCurrentPage } from "@/utils/convert";
import { themeColors } from "@/style/color";
import { SliderType } from "@/models/RouteType";
import { ConfigContext } from "@/stores/ConfigStore";

export interface IProps {
  changeIndex?(name: string, link?: string): void
}

export const Slider: React.FC<IProps> = props => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const { changeIndex } = props;
  let { state } = useContext(ConfigContext);

  let [defaultOpenKey, setDefaultOpenKey] = useState<string[]>([]);

  let bgStatus = localStorage.getItem("bgStatus");

  let linkData = {};
  let page = getCurrentPage();
  let preUrl = page.preUrl;
  let [defaultSelectedKeys, setDefaultSelectedKeys] = useState(page.currentPage);

  const handleClick = (e: ClickParam) => {
    changeIndex && changeIndex(e.key, linkData[e.key]);
    if (!linkData[e.key]) {
      window.location.href = preUrl + e.key + "/index.html";
    } else {
      window.open(linkData[e.key]);
    }
  };

  const renderSlider = (sliderList?: SliderType[]) => {
    return sliderList && sliderList.map(item => {
      if (!item.nextLink) {
        linkData[item.name] = item.link;
        if (item.name === page.currentPage && item.groupName && defaultOpenKey.length === 0) {
          setDefaultOpenKey(item.groupName);
          setDefaultSelectedKeys(item.defaultKey ? item.defaultKey : item.name);
        }
        return item.defaultKey ? null : (
          <Menu.Item key={item.name}>
            <Icon type="pie-chart"/>
            <span>{item.title}</span>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.name}
            title={
              <span>
                <Icon type="apartment"/>
                <span>{item.title}</span>
              </span>
            }>
            {renderSlider(item.nextLink)}
          </SubMenu>
        );
      }
    });
  };

  return (
    <Sider width={260} trigger={null} collapsible
           collapsed={!state.menuCollapsed}
           style={{ background: themeColors.sliderBg, overflowY: "auto", overflowX: "hidden" }}>
      <Menu
        mode="inline"
        theme={bgStatus === "1" ? "dark" : "light"}
        defaultSelectedKeys={[defaultSelectedKeys]}
        defaultOpenKeys={defaultOpenKey}
        style={{ height: "100%", borderRight: 0 }}
        onClick={handleClick}>
        {renderSlider(frameConfig.sliderList)}
      </Menu>
    </Sider>
  );
};