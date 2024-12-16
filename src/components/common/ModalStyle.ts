import styled from "styled-components";

export const ModalStyle = {
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

export const ModalContent = styled.div`
  text-align: center;
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.2rem;
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
