import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
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
      border-color: #ff69b4;
      outline: none; /* 기본 포커스 테두리 제거 */
      box-shadow: 0 0 5px rgba(255, 105, 180, 0.5); /* 핑크색 포커스 효과 */
    }

    &::placeholder {
      color: #aaa;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
    }
  }

  input[type="checkbox"] {
    border: none; /* 테두리 제거 */
    box-shadow: none; /* 그림자 제거 */
  }
`;

export default Form;
