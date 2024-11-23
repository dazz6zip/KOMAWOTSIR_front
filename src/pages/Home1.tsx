// 로그인 후

import styled from "styled-components";
import main from "../images/main.png";
import imsi from "../images/imsi.jpg";
import ButtonS from "../components/common/ButtonS";
import Description from "../components/common/Description";
import Img from "../components/common/Img";

const LogoSection = styled.div`
  text-align: center;
`;

function Home1() {
  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Description>
        디지털 연하장 서비스에 <br />
        오신 것을 환영합니다! <br />
        따뜻한 마음을 담아
        <br /> AI와 함께 연하장을 제작해 보세요.
      </Description>
      <ButtonS category="pink">연하장 신청받기</ButtonS>
      <Img src={imsi} width="90%" />
    </>
  );
}

export default Home1;
