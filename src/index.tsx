import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { Theme } from "./them";
import { RecoilRoot } from "recoil";
//하나의 컴포넌트를 만들때, 그 컴포넌트는 렌더링 될때 전역 스코프에 스타일을 알려준다.

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={Theme}>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </ThemeProvider>
);
