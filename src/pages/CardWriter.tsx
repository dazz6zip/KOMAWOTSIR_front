import styled from "styled-components";
import imsi1 from "../images/imsi1.png";
import ButtonRow from "../components/common/ButtonRow";
import Button from "../components/common/Button";

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0px 3px 10px 3px;
  color: #333;
`;

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

const FooterText = styled.p`
  margin: 5px 0;
`;

const Img = styled.img`
    width: {(props) => props.width};
`

function CardWriter(){
  const receiver = "깨꿈이";
  return (
    <>
      <Title>
        {receiver}님에게<br/>연하장 작성하기
      </Title>
      <Img src={imsi1} width="70%" alt="Main" className="logo-image" />
      <ButtonRow>
        <Button category="gray-s">초안 불러오기</Button>
        <Button category="gray-s">초안 등록하기</Button>
        <Button category="blue-s">ChatGPT로 작성하기</Button>
      </ButtonRow>
      <TextAreaContainer>
        <Label>내용</Label>
        <TextArea maxLength={300} />
      </TextAreaContainer>
      <Button category="hotpink-l">임시 저장</Button>
      <Button category="pink-l">저장하기</Button>
        <FooterText>
          연하장이 공개되는 1월 1일 전까지는 저장한 후에도 얼마든지 수정할 수 있어요.
        </FooterText>
    </>
  );
};

export default CardWriter;
