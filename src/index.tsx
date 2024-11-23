import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

// 폰트 적용
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Jua&family=Nanum+Pen+Script&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
