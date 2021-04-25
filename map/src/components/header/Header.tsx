import React, { useContext } from "react";
import { Col, Layout, Menu, Row, Affix, Icon } from "antd";
import "./app.scss";
import { asserts } from "@/asserts";
import { frameConfig } from "@/components/frame";
import { ClickParam } from "antd/lib/menu";
import { HeaderDropdown } from "./HeaderDropdown";
import { ConfigContext } from "@/stores/ConfigStore";

export const Header: React.FC = () => {
  const { Header } = Layout;
  let { state, dispatch } = useContext(ConfigContext);

  let bgStatus = localStorage.getItem("bgStatus");

  const handleHeaderClick = (e: ClickParam) => {
    let key = e.key;
    for (let item of frameConfig.headerList as any) {
      if (item.name === key && item.link) {
        redirectLink(item.link);
        break;
      }
    }
  };

  const redirectLink = (link: string) => {
    window.location.href = link;
  };

  const renderHeaderMenu = () => {
    return (frameConfig.headerList as any).map(item => <Menu.Item key={item.name}>{item.title}</Menu.Item>);
  };

  return (
    <Affix offsetTop={0}>
      <Header className="frame-header" style={bgStatus === "1" ? {} : style}>
        <Row type="flex" justify="space-between" align="middle" style={{ width: "100%", height: "100%" }}>
          <Col span={8} className='header-logo'>
            <Row type="flex" justify="center" align="middle" className='menu-fold' onClick={() => {
              dispatch({ type: "menu-unfold", menuCollapsed: !state.menuCollapsed });
            }}>
              <Icon type={state.menuCollapsed ? "menu-fold" : "menu-unfold"}/>
            </Row>
            <img src={bgStatus === "1" ? asserts.images.yw_logo_dark : asserts.images.yw_logo_light} alt='航天云网'
                 className='logo' onClick={() => {
              redirectLink("http://www.casicloud.com/");
            }}/>
          </Col>
          <Col span={16} className='header-tab'>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["dev-center"]}
              selectedKeys={["dev-center"]}
              style={{ lineHeight: "61px", display: "inline-block", marginLeft: "20px" }}>
              {renderHeaderMenu()}
            </Menu>
            <HeaderDropdown/>
          </Col>
        </Row>
      </Header>
    </Affix>
  );
};

let style = {
  borderBottom: "1px solid lightgrey"
};