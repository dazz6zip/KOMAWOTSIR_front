// 로그인 후

import styled from "styled-components";
import main from "../images/main.png";
import imsi from "../images/imsi.jpg";
import Button from "../components/common/Button";

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

function Home1(){
  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Description>
        디지털 연하장 서비스에 <br />오신 것을 환영합니다! <br />
        따뜻한 마음을 담아<br /> AI와 함께 연하장을 제작해 보세요.
      </Description>
      <Button category="pink-s">연하장 신청받기</Button>
      <Img src={imsi} width="90%" />
    </>
  );
};

export default Home1;
