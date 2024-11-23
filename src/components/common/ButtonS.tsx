import styled from "styled-components";

interface ButtonProps {
  category: string;
}

const variantStyles: Record<
  string,
  { backgroundColor: string; color?: string }
> = {
  hotpink: { backgroundColor: "#ed798d" },
  blue: { backgroundColor: "#87b9ce" },
  pink: { backgroundColor: "#eeb0b2" },
  gray: { backgroundColor: "#bccbd2" },
  white: { color: "#333", backgroundColor: "#ffffff" },
  whitehotpink: { color: "#ed798d", backgroundColor: "#ffffff" },
  black: { backgroundColor: "#3a3b42" },
};

const defaultStyle = {
  color: "#fff",
  backgroundColor: "#ed798d",
};

export const ButtonS = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  border-radius: 15px;
  padding: 8px;
  font-size: 11px;

  color: ${({ category }) =>
    variantStyles[category]?.color || defaultStyle.color};
  background-color: ${({ category }) =>
    variantStyles[category]?.backgroundColor || defaultStyle.backgroundColor};

  &:hover {
    opacity: 0.9;
  }
`;

export default ButtonS;
