import styled from "styled-components";
import main from "../images/main.png";
import kakao from "../images/kakao.png";

const LogoSection = styled.div`
  text-align: center;
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

const Img = styled.img`
    width: {(props) => props.width};
`

const Span = styled.span`
    color: black;
`

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0px 3px 10px 3px;
  color: #333;
`;

function ApplicantHome(){
  const username = "하하호호";
  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Title>
        {username}님에게<br/>연하장 신청하기
      </Title>
      <Description>
        문자 메시지로 알림을 받지 않고<br />수신된 연하장을 확인하고 싶다면,<br />
        회원가입 후 이용해주세요.
      </Description>
      <Img src={kakao} width="50%" />
      <Span>비회원으로 신청하기</Span>
    </>
  );
};

export default ApplicantHome;
