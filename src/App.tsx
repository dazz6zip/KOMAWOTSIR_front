import Router from "./Router";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Link } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
