import React from "react";
import {Spin} from "antd";

export const LoadingPage: React.FC = () => {
  return <div style={{
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Spin size={"large"}/>
  </div>
};