import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Footer from "./components/Footer";
import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import {
  AppContainer,
  Content,
  StyledToastContainer,
} from "./StyledComponents";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <GlobalStyle />
        <AppContainer>
          <Content>
            <StyledToastContainer
              position="bottom-center"
              autoClose={2000}
              closeOnClick
              pauseOnHover
            />
            <Router />
          </Content>
          <Footer />
        </AppContainer>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
