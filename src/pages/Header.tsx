import styled from "styled-components";
import logo from "../images/logo.png";
import Img from "../components/common/Img";

const HeaderContainer = styled.div`
  height: 8vh;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px 2px 10px;

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

function Header() {
  return (
    <HeaderContainer>
      <button className="menu">☰</button>
      <Img src={logo} width="30%" alt="Logo" className="logo-image" />
      <button className="profile"></button>
    </HeaderContainer>
  );
}

export default Header;
