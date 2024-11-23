import styled from "styled-components";
import main from "../images/main.png";
import kakao from "../images/kakao.png";
import Title from "../components/common/Title";
import Description from "../components/common/Description";
import ButtonL from "../components/common/ButtonL";
import Img from "../components/common/Img";

const LogoSection = styled.div`
  text-align: center;
`;

function ApplicantHome() {
  const username = "하하호호";
  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Title>
        {username}님에게
        <br />
        연하장 신청하기
      </Title>
      <Description>
        문자 메시지로 알림을 받지 않고
        <br />
        수신된 연하장을 확인하고 싶다면,
        <br />
        회원가입 후 이용해주세요.
      </Description>
      <Img src={kakao} width="50%" />
      <ButtonL category="white">비회원으로 신청하기</ButtonL>
    </>
  );
}

export default ApplicantHome;
