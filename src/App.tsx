import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Footer from "./components/Footer";
import GlobalStyle from "./GlobalStyle";
import Router from "./Router";

const StyledToastContainer = styled(ToastContainer)`
  margin-bottom: 30px;

  .Toastify__toast-icon {
    display: none;
  }

  .Toastify__toast {
    max-height: 20px;
    width: 300px;
    max-width: 90%;
    margin: 0 auto;
    background-color: #1d1c1a;
    color: #2d2d2d;
    border-radius: 8px;
    font-size: 16px;
    text-align: center;
  }

  .Toastify__toast--success {
    background-color: #dee7eb;
    color: #87b9ce;
  }

  .Toastify__toast--error {
    background-color: #edd0d1;
    color: #ed798d;
  }

  button.Toastify__close-button {
    display: none;
  }

  .Toastify__progress-bar {
    background-color: #87b9ce;
  }

  .Toastify__progress-bar--error {
    background-color: #ed798d;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden; /* 넘치는 부분 숨김 */
`;

const Content = styled.div`
  flex-grow: 1;
`;

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
