import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0px 3px 10px 3px;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const QuestionBox = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-top: 20px;
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
  font-size: 1rem;
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


function FormMaker(){
  return (
    <>
      <Title>
        연하장 신청받기
      </Title>
      <Description>
        기본적으로 닉네임과 전화번호를 수집해요.<br/>
        추가적으로 알아야 할 정보가 있다면<br/>
        질문을 추가해 보세요!
      </Description>
      <ButtonS category="pink">+ 질문 추가하기</ButtonS>

      <QuestionBox>
        <QuestionRow>
          <Label>질문 *</Label>
          <span>삭제</span>
        </QuestionRow>
        <InputGroup>
          <Input type="text" placeholder="나한테 할 말" />
          <Input type="text" placeholder="할 말 있으면 해라" />
        </InputGroup>

        <QuestionRow>
          <Label>질문 *</Label>
          <span>삭제</span>
        </QuestionRow>

        <ButtonL category="pink">저장하기</ButtonL><br/>
        <ButtonL category="hotpink">링크 공유하기</ButtonL>
      </QuestionBox>
    </>
  );
};

export default FormMaker;
