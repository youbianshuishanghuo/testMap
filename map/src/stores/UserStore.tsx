import React, { useEffect, useState } from "react";

export interface UserInfo {
  name: string;
  company: string;

}

export interface IuserInfo {
  userInfo: UserInfo

  setUserInfo?(user: UserInfo): void
}

let defaultUserInfo: UserInfo = {
  name: "xxx",
  company: "北京航天云路"
};

let userStore: IuserInfo = { userInfo: defaultUserInfo };

export const UserContext = React.createContext(userStore);

export const UserProvider: React.FC = props => {
  let [userInfo, setUserInfo] = useState(defaultUserInfo);

  useEffect(() => {

  }, []);


  userStore = { userInfo, setUserInfo };
  return <UserContext.Provider {...props} value={userStore}/>;
};