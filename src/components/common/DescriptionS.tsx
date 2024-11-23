import styled from "styled-components";

interface DescriptionSProps {
  align?: string;
}

const DescriptionS = styled.p<DescriptionSProps>`
  font-size: 10px;
  color: #555;
  ext-align: ${({ align }) => align || "center"};
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 9px;
  }

  @media (min-width: 1024px) {
    font-size: 12px;
  }
`;

export default DescriptionS;
