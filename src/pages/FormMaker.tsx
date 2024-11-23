import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Description from "../components/common/Description";

const QuestionBox = styled.div`
  padding-top: 3px;
  margin-top: 10px;
`;

const QuestionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
  color: #f28b8b;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
`;

function FormMaker() {
  return (
    <>
      <Title>연하장 신청받기</Title>
      <Description>
        기본적으로 닉네임과 전화번호를 수집해요.
        <br />
        추가적으로 수집할 정보를 등록해주세요.
        <ButtonS category="pink">+ 질문 추가하기</ButtonS>
      </Description>
      <QuestionBox>
        <QuestionRow>
          <Label>질문 *</Label>
          <ButtonS category="white">삭제</ButtonS>
        </QuestionRow>
        <InputGroup>
          <Input type="text" placeholder="꼭 적어줬으면 하는 내용이 뭐야?" />
          <Input
            type="text"
            placeholder="올해 나랑 함께한 최고의 추억에 대해 써줘."
          />
        </InputGroup>

        <QuestionRow>
          <Label>질문 *</Label>
          <ButtonS category="white">삭제</ButtonS>
        </QuestionRow>
        <InputGroup>
          <Input type="text" placeholder="나한테 할 말" />
          <Input type="text" placeholder="할 말 있으면 해라" />
        </InputGroup>
      </QuestionBox>
      <ButtonL category="pink">저장하기</ButtonL>
      <ButtonL category="hotpink">링크 공유하기</ButtonL>
    </>
  );
}

export default FormMaker;
