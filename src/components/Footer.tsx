import { useEffect } from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  height: 13vh;
  font-size: 15px;
  font-family: Nanum Pen Script;
  color: black;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 17px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const AdContainer = styled.div`
  margin: 10px auto;
  display: block;
  width: 320px;
  height: 50px;
`;

function Footer() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <FooterContainer>
      💌 앤드이어
      <p>team.cobbu@gmail.com</p>
      <AdContainer>
        <ins
          className="kakao_ad_area"
          style={{ display: "block" }}
          data-ad-unit="DAN-3LF5YDcdDhxyN2FG"
          data-ad-width="320"
          data-ad-height="50"
        ></ins>
      </AdContainer>
    </FooterContainer>
  );
}

export default Footer;
