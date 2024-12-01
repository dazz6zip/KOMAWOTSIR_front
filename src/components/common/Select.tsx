import styled from "styled-components";

interface SelectProps {
  isOpen: boolean;
}

export const Select = styled.div<SelectProps>`
  position: relative;
  width: 200px;

  .select-btn {
    padding: 10px 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 5px;
    z-index: 10;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};

    .option {
      padding: 10px 16px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: pink; /* 호버 시 배경색 */
      }
    }
  }
`;
