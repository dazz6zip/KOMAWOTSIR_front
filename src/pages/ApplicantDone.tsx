import styled from "styled-components";
import main from "../images/main.png";
import kakao from "../images/kakao.png";
import DescriptionS from "../components/common/DescriptionS";
import Description from "../components/common/Description";
import Title from "../components/common/Title";
import Img from "../components/common/Img";

const LogoSection = styled.div`
  text-align: center;
`;

function ApplicantDone() {
  const username = "하하호호";
  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Title>연하장 신청 완료</Title>
      <Description>
        신년에 연하장이 도착하면,
        <br />
        입력하신 전화번호로
        <br />
        안내 메시지를 보내드릴게요.
        <br />
        내년에 만나요!
      </Description>
      <Img src={kakao} width="50%" />
      <DescriptionS>
        카카오로 간편하게 로그인/회원가입하고
        <br /> 연하장을 신청받아 보세요!
      </DescriptionS>
    </>
  );
}

export default ApplicantDone;
