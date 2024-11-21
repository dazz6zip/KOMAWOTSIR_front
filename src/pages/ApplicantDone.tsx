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

function ApplicantDone(){
  const username = "하하호호";
  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Title>
        연하장 신청 완료
      </Title>
      <Description>
        신년에 연하장이 도착하면,<br />입력하신 전화번호로<br />
        안내 메시지를 보내드릴게요.<br />내년에 만나요!
      </Description>
      <Img src={kakao} width="50%" />
      <Span>카카오로 간편하게 로그인/회원가입하고<br/> 연하장을 신청받아 보세요!</Span>
    </>
  );
};

export default ApplicantDone;
