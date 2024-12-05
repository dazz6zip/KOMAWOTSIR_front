import axios from "axios";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.png";

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

const OverlayButton = styled.button`
  position: fixed; /* 화면에 고정 */
  top: 70px; /* 하단에서 30px 위로 배치 */
  left: 20px; /* 좌측에서 20px 떨어짐 */
  z-index: 1000; /* 다른 요소 위에 배치 */
  background: none; /* 투명 배경 */
  border: none; /* 테두리 제거 */
  color: #333; /* 텍스트 색상 */
  font-size: 16px; /* 텍스트 크기 */
  cursor: pointer;

  display: flex; /* 아이콘과 텍스트 정렬 */
  align-items: center;

  &:hover {
    color: #000; /* 호버 시 텍스트 색상 변경 */
  }

  svg {
    margin-right: 8px; /* 아이콘과 텍스트 간격 */
  }
`;

function Header() {
  const nav = useHistory();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const closeMenu = () => setIsMenuOpen(false);

  const logoutProc = () => {
    axios
      .post(`/api/users/logout`)
      .then((res) => {
        // console.log(res);
        sessionStorage.removeItem("userId");
        closeMenu();
        nav.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {location.pathname !== "/" && (
        <OverlayButton
          onClick={() => {
            nav.goBack();
          }}
        >
          <FaArrowLeft
            color="#EEB0B2"
            size="20"
            style={{ marginRight: "10px" }}
          />
        </OverlayButton>
      )}

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
        <StyledMenuItem to="/yearly-presents" onClick={closeMenu}>
          나의 편지함
        </StyledMenuItem>
        <StyledMenuItem to="/yearly-presents" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✶</CustomIcon>올해 받은 연하장
        </StyledMenuItem>
        <StyledMenuItem to="/all-presents" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✷</CustomIcon>전체 수신 목록
        </StyledMenuItem>
        <StyledMenuItem to="/create-form">편지 보내기</StyledMenuItem>
        <StyledMenuItem to="/create-form" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✶</CustomIcon>신청받기
        </StyledMenuItem>
        <StyledMenuItem to="/receiver-list" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✷</CustomIcon>작성하기
        </StyledMenuItem>
        <StyledMenuItem to="/add-receiver" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✷</CustomIcon>수신인 추가하기
        </StyledMenuItem>
        <StyledMenuItem to="/design" onClick={closeMenu} $isSubMenu>
          <CustomIcon>✸</CustomIcon>디자인하기
        </StyledMenuItem>
        <StyledMenuItem to="" onClick={logoutProc}>
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
