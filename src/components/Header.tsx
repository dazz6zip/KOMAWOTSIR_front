import styled from "styled-components";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderContainer = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  background-color: #fff;
`;

const MenuStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "20px",
    height: "20px",
    left: "20px",
    top: "15px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmCrossButton: {
    position: "fixed",
    width: "20px",
    height: "20px",
    left: "20px",
    top: "15px",
  },
  bmMenu: {
    background: "#f4f4f4",
    padding: "20px",
    fontSize: "1.15em",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const LogoImg = styled.img`
  width: 100px;
  height: auto;
  display: inline-block;
`;

const CustomIcon = styled.b`
  color: #ed798d;
  padding-right: 10px;
`;

const StyledMenuItem = styled(Link)<{ $isSubMenu?: boolean }>`
  display: block;
  text-decoration: none;
  color: ${(props) => (props.$isSubMenu ? "#888" : "#3A3B42")};
  font-size: ${(props) => (props.$isSubMenu ? "16px" : "18px")};

  padding-left: ${(props) => (props.$isSubMenu ? "20px" : "0")};
  margin-top: ${(props) => (props.$isSubMenu ? "20px" : "30px")};

  &:hover {
    color: ${(props) => (props.$isSubMenu ? "#666" : "#333")};
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Menu
        customBurgerIcon={<GiHamburgerMenu size={"30"} />}
        customCrossIcon={<FaArrowLeft size={"30"} />}
        width={"250px"}
        isOpen={isMenuOpen}
        onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
        styles={MenuStyles}
      >
        <StyledMenuItem to="/update-info" onClick={closeMenu}>
          회원정보 수정
        </StyledMenuItem>
        <StyledMenuItem to="" onClick={closeMenu}>
          나의 편지함
        </StyledMenuItem>
        <StyledMenuItem to="" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✶</CustomIcon>올해 받은 연하장
        </StyledMenuItem>
        <StyledMenuItem to="" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✷</CustomIcon>전체 수신 목록
        </StyledMenuItem>
        <StyledMenuItem to="">편지 보내기</StyledMenuItem>
        <StyledMenuItem to="/create-form" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✶</CustomIcon>신청받기
        </StyledMenuItem>
        <StyledMenuItem to="/receiver-list" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✷</CustomIcon>작성하기
        </StyledMenuItem>
        <StyledMenuItem to="" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✸</CustomIcon>디자인하기
        </StyledMenuItem>
        <StyledMenuItem to="" onClick={closeMenu}>
          로그아웃
        </StyledMenuItem>
      </Menu>
      <HeaderContainer>
        <Link to="/">
          <LogoImg src={logo} alt="Logo" />
        </Link>
      </HeaderContainer>
    </>
  );
}

export default Header;
