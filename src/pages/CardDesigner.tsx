import styled from "styled-components";
import imsi1 from "../images/imsi1.png";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Description from "../components/common/Description";
import ButtonRow from "../components/common/ButtonRow";
import Img from "../components/common/Img";

const Options = styled.div`
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    gap: 3px;
    align-items: center; // 세로 중앙 정렬
    margin: 10px 0;
  }

  .option-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 14px;
      color: #333;
    }

    button {
      background-color: #ed798d;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #d96b7f;
      }
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

function CardDesigner() {
  return (
    <>
      <Title>연하장 디자인하기</Title>
      <Description>
        신년 연하장의 디자인을 설정할 수 있어요.
        <br />
        2025년 작성하는 모든 연하장에
        <br />
        공통으로 적용됩니다.
      </Description>
      <Img src={imsi1} width="80%" />
      <Options>
        <div>
          <label>배경화면</label>
          <ButtonS category="whitehotpink">변경하기</ButtonS>
          <Img src={imsi1} width="20%" />
        </div>

        <div>
          <label>썸네일</label>
          <ButtonS category="whitehotpink">변경하기</ButtonS>
          <Img src={imsi1} width="20%" />
        </div>

        <div>
          <label>글꼴</label>
          <ButtonS category="whitehotpink">변경하기</ButtonS>
          <Img src={imsi1} width="20%" />
        </div>

        <div>
          <label>글꼴 크기</label>
          <ButtonRow>
            <button>보통</button>
            <button>크게</button>
          </ButtonRow>
        </div>
      </Options>
      <ButtonL category="pink">저장하기</ButtonL>
    </>
  );
}

export default CardDesigner;
