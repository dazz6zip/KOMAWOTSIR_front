import axios from "axios";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import {
  CustomIcon,
  HeaderAndMenu,
  HeaderContainer,
  LogoImg,
  MenuStyles,
  OverlayButton,
  StyledMenuItem,
} from "../StyledComponents";
import { toast } from "react-toastify";

function Header() {
  const nav = useHistory();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const logoutProc = () => {
    sessionStorage.removeItem("userId");
    axios
      .post(`/api/users/logout`)
      .then((res) => {
        // console.log(res);

        closeMenu();
        toast.success("로그아웃되었습니다. 다음에 또 만나요!");
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
      <HeaderAndMenu>
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
      </HeaderAndMenu>
    </>
  );
}

export default Header;
