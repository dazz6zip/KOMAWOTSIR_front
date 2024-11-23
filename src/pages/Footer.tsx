import styled from "styled-components";
import logo from "../images/logo.png";

const FooterContainer = styled.footer`
  height: 7vh;
  font-size: 14px;
  color: black;
  text-align: center;
  margin-bottom: 3px;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      앤드이어 <br />
      team.cobbu@gmail.com
    </FooterContainer>
  );
}

export default Footer;
