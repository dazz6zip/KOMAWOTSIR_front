import styled from "styled-components";

const Description = styled.p`
  font-size: 14px;
  color: #555;
  text-align: center;
  line-height: 1.5;

  b {
    font-weight: bold;
    color: #87b9ce;
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export default Description;
