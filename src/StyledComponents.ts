import styled from "styled-components";
import { PostStatus } from "./fetcher";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { borderRightStyle } from "html2canvas/dist/types/css/property-descriptors/border-style";

export const DraftCard = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 10px auto;
  padding: 15px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
  }

  input {
    margin-right: 15px;
  }
`;

export const DraftNullInfo = styled.div`
  margin-top: 200px;
  margin-bottom: 300px;
`;

export const DraftTitle = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 3px;
`;

export const DraftContents = styled.div`
  color: #777;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 3px;
`;

export const LogoSection = styled.div`
  text-align: center;
`;

export const Options = styled.div`
  width: 100%;
  margin-left: 25px;
  div {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 3px;
    align-items: center;

    margin: 10px 0;

    img {
      width: 80px;
    }

    button {
      width: 80px;
    }
  }

  .option-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 14px;
      color: #333;
    }
  }
`;

export const SizeButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#EEB0B2" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  border: ${(props) =>
    props.isSelected ? "2px solid #ED798D" : "1px solid #ccc"};
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#EEB0B2" : "#f5f5f5")};
    color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  }
`;

export const ColorButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? (props.children === "흰색" ? "#000" : "#fff") : "#fff"};
  color: ${(props) =>
    props.isSelected ? (props.children === "흰색" ? "#fff" : "#000") : "#000"};
  border: ${(props) =>
    props.isSelected ? "2px solid #ED798D" : "1px solid #ccc"};
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.children === "흰색" ? "#333" : "#e0e0e0"};
    color: ${(props) => (props.children === "흰색" ? "#fff" : "#000")};
  }
`;

export const FontPreview = styled.p<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily};
  font-size: 20px;
`;

export const Card = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 30px auto;
  background: pink;
`;

export const TextAreaContainer = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  width: 300px;
  height: 100px;
  padding: 10px;
  font-size: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

export const PreviewArea = styled.div<{
  bimage?: string;
  fsize?: number;
  fColor?: string;
  fFamily?: string;
}>`
  background-image: url(${(props) => props.bimage});
  background-size: contain;
  font-size: ${(props) => props.fsize}px;
  color: ${(props) => props.fColor};
  font-family: ${(props) => props.fFamily};
  width: 300px;
  min-height: 200px;
  display: block;
  text-align: center;
  align-items: center;
  padding: 30px;
`;

export const FontCard = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 10px auto;
  padding: 15px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
  }

  input {
    margin-right: 15px;
  }
`;

export const FontTitle = styled.div<{ fName: string }>`
  font-family: ${(props) => props.fName};
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 3px;
`;

export const ImgWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  display: inline-block;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: normal;
  color: #333;
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;

  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#d9d9d9" : "#f5f5f5")};
  color: ${(props) => (props.isActive ? "#000" : "#888")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#c0c0c0" : "#e0e0e0")};
  }
`;

export const ColorBox = styled.div<{ color: string; isSelected: boolean }>`
  width: 100%;
  padding-top: 66.6%;
  position: relative;
  background-image: url(${(props) => `${props.color}`});
  background-size: cover;
  border: ${(props) => (props.isSelected ? "4px solid #000" : "none")};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

export const InputFile = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const PreviewContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
`;

export const QuestionBox = styled.div`
  padding-top: 3px;
  margin-top: 10px;
`;

export const QuestionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
`;

export const InquiryLabel = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
  color: #f28b8b;
  margin-bottom: 5px;
  display: block;
`;

export const QuestionForm = styled.form`
  text-align: center;

  button {
    margin-bottom: 2px;
  }
`;

export const Input = styled.input<{ isError?: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.isError ? "#ED798D" : "#ddd")};
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const NicknameInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const ReceiverListArea = styled.div`
  margin-top: 200px;
  margin-bottom: 250px;
`;

export const CardContainer = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #d8e3ed;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 5px;
`;

export const CheckForm = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const CardHeader = styled.div<{ statusForHeader: PostStatus }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => {
    switch (props.statusForHeader) {
      case PostStatus.PROGRESSING:
        return "#87B9CE";
      case PostStatus.COMPLETED:
        return "#EEB0B2";
      default:
        return "#BCCBD2";
    }
  }};
  padding: 10px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #333;
`;

export const HeaderItem = styled.div`
  display: flex;
  align-items: center;
`;

export const StarIcon = styled.span`
  color: #ffffff;
  font-size: 1.2rem;
  margin-right: 10px;
`;

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.7rem;
`;

export const CardBody = styled.div`
  background-color: #ffffff;
  padding: 15px;
  font-size: 0.7rem;
  color: #666;
`;

export const WriteButton = styled.div`
  text-align: center;
  padding: 5px;
  color: #888;
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;

export const StateCheckBox = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
`;

export const ReceiverLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledCheckbox = styled.input`
  appearance: none; /* 기본 체크박스 스타일 제거 */
  width: 20px;
  height: 20px;
  border: 2px solid #eeb0b2;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:checked {
    background-color: #eeb0b2; /* 체크 상태 배경색 */
    border-color: #eeb0b2; /* 체크 상태 테두리색 */
  }

  &:checked::after {
    content: "✔"; /* 체크 표시 */
    color: white;
    font-size: 14px;
    display: block;
    text-align: center;
  }
`;

export const MemoArea = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 10px;
  color: #aaa;
  font-size: 0.8rem;
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
    margin-right: 10px;
    color: #555;
  }

  i {
    font-style: italic;
    color: #ed798d;
    margin-left: 5px;
  }

  div {
    display: flex;
    align-items: center;
  }

  input {
    margin-left: 10px;
    width: 200px;
    height: 30px;

    padding: 7px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 10px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 1px rgba(0, 123, 255, 0.5);
    }
  }
`;

export const ContentsBox = styled.div`
  text-align: center;
  padding-bottom: 10px;
  color: #3a3b42;
`;

export const SmsOption = styled.div`
  padding-top: 120px;
  text-align: center;
  font-size: 80%;

  input[type="checkbox"] {
    margin: 0;
    width: auto;
    height: auto;
  }

  div {
    padding: 10px 0;
    font-size: 80%;
    color: #666;
  }
`;

export const Withdrawal = styled.span`
  padding-top: 10px;
  text-align: center;
  font-size: 60%;
  color: #666;
`;

export const ModalContent = styled.div`
  text-align: center;
  line-height: 1.5;
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 7px; /* 입력창 안쪽 여백 */
    margin-bottom: 20px; /* 입력창 간 간격 */
    border: 1px solid #ccc; /* 테두리 */
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      border-color: #007bff;
      outline: none; /* 기본 포커스 테두리 제거 */
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 포커스 시 추가 효과 */
    }

    &::placeholder {
      color: #aaa;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
    }
  }
`;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    padding: "30px 20px",
    textAlign: "center" as "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 추가
    border: "none", // 테두리 제거
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 더 어두운 오버레이
  },
};

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  padding: 10px 0;
  background-color: #fff;
`;

export const HeaderAndMenu = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bccbd2;
  margin-bottom: 5px;
  width: 100%;
`;

export const MenuStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "20px",
    height: "20px",
    top: "15px",
    transform: "translateX(20px)", // 왼쪽으로 20px 이동
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmCrossButton: {
    width: "20px",
    height: "20px",
    left: "20px",
    top: "15px",
  },
  bmMenuWrap: {
    position: "absolute", // 부모 컨테이너 기준으로 설정
    overflow: "hidden", // 넘치는 애니메이션 숨김
    height: "100vh", // 세로 높이 전체를 덮기
    top: "0", // 상단에서 시작
  },
  bmMenu: {
    background: "#f5f5f5",
    padding: "20px",
    fontSize: "1.15em",
    height: "100%",
    boxShadow: "none",
    transform: "translateX(0)",
    transition: "transform 0.3s ease-in-out",
  },
  bmOverlay: {
    display: "none",
  },
};

export const LogoImg = styled.img`
  display: block; /* 인라인 속성 제거 및 블록 요소로 변경 */
  margin: 0 auto; /* 좌우 중앙 정렬 */
  max-width: 100%; /* 부모 컨테이너에 맞게 조정 */
  height: auto; /* 비율 유지 */
  width: 125px;
  max-height: 100px; /* 최대 높이 설정 (선택사항) */
`;

export const CustomIcon = styled.b`
  color: #ed798d;
  padding-right: 10px;
`;

export const StyledMenuItem = styled(Link)<{ $isSubMenu?: boolean }>`
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

export const OverlayButton = styled.button`
  position: absolute; /* 부모 컨테이너 기준으로 위치 설정 */
  top: 70px; /* 하단에서 30px 위로 배치 */
  left: 20px; /* 좌측에서 20px 떨어짐 */
  z-index: 10; /* 다른 요소 위에 배치 */
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

export const StyledToastContainer = styled(ToastContainer)`
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

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
`;

export const Content = styled.div`
  flex-grow: 1;
`;

export const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 최상단 레이어 */
  pointer-events: none; /* 클릭 차단 */
`;

export const LoadingImage = styled.img`
  width: 400px;
  margin-bottom: 100px;
`;
