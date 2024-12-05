import Router from "./Router";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Link } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const StyledToastContainer = styled(ToastContainer)`
  margin-bottom: 30px;
  margin-top: 10px;

  .Toastify__toast-icon {
    display: none;
  }

  .Toastify__toast {
    max-height: 20px;
    width: 300px; /* 알림의 최대 너비 설정 */
    max-width: 90%; /* 화면 크기에 따라 유동적으로 조정 */
    margin: 0 auto; /* 가로 중앙 정렬 */
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

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <GlobalStyle />
        <StyledToastContainer
          position="bottom-center"
          autoClose={2000}
          closeOnClick
          pauseOnHover
        />
        <Router />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
