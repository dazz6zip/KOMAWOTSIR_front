import styled from "styled-components";

const FooterContainer = styled.footer`
  height: 7vh;
  font-size: 15px;
  font-family: Nanum Pen Script;
  color: black;
  text-align: center;
  margin-bottom: 3px;

  @media (min-width: 768px) {
    font-size: 17px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      💌 앤드이어
      <p>team.cobbu@gmail.com</p>
    </FooterContainer>
  );
}

export default Footer;
