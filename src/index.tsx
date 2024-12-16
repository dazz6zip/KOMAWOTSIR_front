import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

const queryClient = new QueryClient();

// 폰트 적용
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Jua&family=Nanum+Pen+Script&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// 광고 스크립트 추가
const adScript = document.createElement("script");
adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1639750615440525"; // 광고 스크립트 URL
adScript.async = true;
adScript.crossOrigin = "anonymous";
document.head.appendChild(adScript);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
