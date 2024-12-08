import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ASenderState } from "../atoms";
import Description from "../components/common/Description";
import DescriptionS from "../components/common/DescriptionS";
import Img from "../components/common/Img";
import Title from "../components/common/Title";
import kakao from "../images/kakao.png";
import main from "../images/main.png";

const LogoSection = styled.div`
  text-align: center;
`;

<<<<<<<< HEAD:src/pages/ApplicantComplete.tsx
function ApplicantComplete() {
  const username = "하하호호";
========
function ApplyCompletedGuest() {
  const sender = useRecoilValue(ASenderState);
>>>>>>>> develop:src/pages/ApplyCompletedGuest.tsx
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

<<<<<<<< HEAD:src/pages/ApplicantComplete.tsx
export default ApplicantComplete;
========
export default ApplyCompletedGuest;
>>>>>>>> develop:src/pages/ApplyCompletedGuest.tsx
