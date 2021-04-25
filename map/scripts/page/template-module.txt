import React from "react";
import ReactDom from "react-dom";
import { App } from "./App";
import { FrameContainer } from "@/components/frame";

ReactDom.render(
  <FrameContainer>
    <App/>
  </FrameContainer>,
  document.getElementById("app") as HTMLElement
);