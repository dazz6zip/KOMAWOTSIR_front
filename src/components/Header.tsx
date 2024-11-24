import styled from "styled-components";
import logo from "../images/logo.png";
import Sidebar from "react-sidebar";
import Title from "./common/Title";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const HeaderContainer = styled.div`
  height: 60px; /* 고정된 높이 */
  display: flex;
  justify-content: space-between; /* 버튼과 로고를 양쪽으로 배치 */
  align-items: center;
  padding: 0 20px; /* 좌우 패딩 추가 */
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;

  .menu-button {
    font-size: 24px;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
`;

const LogoImg = styled.img`
  width: 100px; /* 로고 크기 고정 */
  height: auto;
  display: inline-block;
`;

// 햄버거 메뉴 스타일
const MenuContent = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #f4f4f4;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled(Link)<{ $isSubMenu?: boolean }>`
  display: block;
  text-decoration: none;
  color: ${(props) => (props.$isSubMenu ? "gray" : "black")};
  font-size: ${(props) => (props.$isSubMenu ? "16px" : "18px")};
  margin-top: ${(props) => (props.$isSubMenu ? "0" : "16px")};
  margin-bottom: 15px;
  margin-left: ${(props) => (props.$isSubMenu ? "20px" : "0")};

  &:hover {
    color: ${(props) => (props.$isSubMenu ? "#333" : "#555")};
  }
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Sidebar
        sidebar={
          <MenuContent onClick={closeMenu}>
            <FaArrowLeft />
            <MenuItem to="/update-info">회원정보 수정</MenuItem>
            <MenuItem to="">나의 편지함</MenuItem>
            <MenuItem to="" $isSubMenu>
              올해 받은 연하장
            </MenuItem>
            <MenuItem to="" $isSubMenu>
              전체 수신 목록
            </MenuItem>
            <MenuItem to="">편지 보내기</MenuItem>
            <MenuItem to="" $isSubMenu>
              신청받기
            </MenuItem>
            <MenuItem to="" $isSubMenu>
              작성하기
            </MenuItem>
            <MenuItem to="" $isSubMenu>
              디자인하기
            </MenuItem>
            <MenuItem to="">로그아웃</MenuItem>
          </MenuContent>
        }
        open={isOpen}
        onSetOpen={setIsOpen}
        styles={{
          sidebar: { background: "white", zIndex: 1000 as any },
          overlay: { background: "rgba(0, 0, 0, 0.3)" },
        }}
      >
        <HeaderContainer>
          <button onClick={toggleMenu} className="menu-button">
            ☰
          </button>
          <Link to="/">
            <LogoImg src={logo} alt="Logo" />
          </Link>
        </HeaderContainer>
      </Sidebar>
    </>
  );
}

export default Header;
