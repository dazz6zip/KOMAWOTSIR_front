import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import main from "../images/main.png";
import kakao from "../images/kakao.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-color: #fff;
  font-family: "Apple SD Gothic Neo", sans-serif;
  padding: 0 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 40px;
  }

  @media (min-width: 1024px) {
    padding: 0 80px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;

  .menu {
    font-size: 24px;
    cursor: pointer;
  }

  .profile {
    width: 40px;
    height: 40px;
    background-color: #e0e0e0;
    border-radius: 50%;
  }

  @media (min-width: 768px) {
    .menu {
      font-size: 28px;
    }

    .profile {
      width: 50px;
      height: 50px;
    }
  }
`;

const LogoSection = styled.div`
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const Img = styled.img`
    width: {(props) => props.width};
`

const Footer = styled.footer`
  font-size: 14px;
  color: black;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const App: React.FC = () => {
  return (
    <Container>
      <Header>
        <div className="menu">☰</div>
        <Img src={logo} width="30%" alt="Logo" className="logo-image"/>
        <div className="profile"></div>
      </Header>
      <LogoSection>
        <Img src={main} width="100%" alt="Main" className="logo-image" />
      </LogoSection>
      <Description>
        디지털 연하장 서비스에 <br />오신 것을 환영합니다! <br />
        따뜻한 마음을 담아<br /> AI와 함께 연하장을 제작해 보세요.
      </Description>
    <Img src={kakao} width="60%" />
      <Footer>
        앤드이어 <br />
        team.cobbu@gmail.com
      </Footer>
    </Container>
  );
};

export default App;
