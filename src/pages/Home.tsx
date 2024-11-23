import styled from "styled-components";
import main from "../images/main.png";
import kakao from "../images/kakao.png";
import Description from "../components/common/Description";

const LogoSection = styled.div`
  text-align: center;
`;

const Img = styled.img`
    width: {(props) => props.width};
`;

function Home() {
  return (
    <>
      <LogoSection>
        <Img src={main} width="100%" alt="Main" className="logo-image" />
      </LogoSection>
      <Description>
        디지털 연하장 서비스에 <br />
        오신 것을 환영합니다! <br />
        따뜻한 마음을 담아
        <br /> AI와 함께 연하장을 제작해 보세요.
      </Description>
      <Img src={kakao} width="50%" />
    </>
  );
}

export default Home;
