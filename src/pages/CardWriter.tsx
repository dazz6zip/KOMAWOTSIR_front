import styled from "styled-components";
import imsi1 from "../images/imsi1.png";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import ButtonColumn from "../components/common/ButtonColumn";
import DescriptionS from "../components/common/DescriptionS";
import Img from "../components/common/Img";

const TextAreaContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 10px;
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

function CardWriter() {
  const receiver = "깨꿈이";
  return (
    <>
      <Title>
        {receiver}님에게
        <br />
        연하장 작성하기
      </Title>
      <Img src={imsi1} width="90%" alt="Main" className="logo-image" />
      <ButtonRow>
        <ButtonS category="gray">초안 불러오기</ButtonS>
        <ButtonS category="gray">초안 등록하기</ButtonS>
        <ButtonS category="blue">ChatGPT로 작성하기</ButtonS>
      </ButtonRow>
      <TextAreaContainer>
        <Label>내용</Label>
        <TextArea maxLength={300} />
      </TextAreaContainer>
      <ButtonRow>
        <ButtonL category="hotpink">임시 저장</ButtonL>
        <ButtonL category="pink">저장하기</ButtonL>
      </ButtonRow>
      <DescriptionS>
        연하장이 공개되는 1월 1일 전까지는 <br />
        저장한 후에도 얼마든지 수정할 수 있어요.
      </DescriptionS>
    </>
  );
}

export default CardWriter;
