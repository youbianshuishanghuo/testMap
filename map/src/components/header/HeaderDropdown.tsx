import React, {useContext} from "react";
import {Avatar, Dropdown, Menu} from "antd";
import {ClickParam} from "antd/lib/menu";
import "./app.scss";
import {UserContext} from "@/stores/UserStore";
import intl from "react-intl-universal";
import {logout} from "@/service/http";

export const HeaderDropdown: React.FC = () => {
  let user = useContext(UserContext);
  let {userInfo} = user;
  const handleUserInfoClick = (e: ClickParam) => {
    let key = e.key;
    if (key === "userInfo") {
      window.location.href = "http://uc.casicloud.com/new/user_manager";
    } else {
      logout();
    }
  };

  const menu = (
    <Menu theme="dark" className='header-dropdown' onClick={handleUserInfoClick}>
      <div>
        <p>{intl.get("welcome")}</p>
        <p>{userInfo ? userInfo.name : ""}</p>
        <p>{userInfo ? userInfo.company : ""}</p>
      </div>
      <Menu.Divider/>
      <Menu.Item key="userInfo">{intl.get("account-management")}</Menu.Item>
      <Menu.Item key="quit">{intl.get("quit")}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click", "hover"]} placement="bottomRight">
      <Avatar size="large" icon="user"/>
    </Dropdown>
  );
};