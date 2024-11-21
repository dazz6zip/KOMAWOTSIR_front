import styled from "styled-components";

interface ButtonProps {
  category: string;
}

const variantStyles: Record<
  string,
  { padding: string; fontSize: string; color: string; backgroundColor: string; width: string; height: string }
> = {
  "hotpink-s": { padding: "1.2rem", fontSize: "1rem", color: "#fff", backgroundColor: "#ed798d", width: "40%", height: "2rem" },
  "hotpink-l": { padding: "1.5rem", fontSize: "1.25rem", color: "#fff", backgroundColor: "#ed798d", width: "90%", height: "3rem" },
  "blue-s": { padding: "1.2rem", fontSize: "1rem", color: "#fff", backgroundColor: "#87b9ce", width: "40%", height: "2rem" },
  "blue-l": { padding: "1.5rem", fontSize: "1.25rem", color: "#fff", backgroundColor: "#87b9ce", width: "90%", height: "3rem" },
  "pink-s": { padding: "1.2rem", fontSize: "1rem", color: "#fff", backgroundColor: "#eeb0b2", width: "40%", height: "2rem" },
  "pink-l": { padding: "1.5rem", fontSize: "1.25rem", color: "#fff", backgroundColor: "#eeb0b2", width: "90%", height: "3rem" },
  "gray-s": { padding: "1.2rem", fontSize: "1rem", color: "#fff", backgroundColor: "#bccbd2", width: "40%", height: "2rem" },
  "gray-l": { padding: "1.5rem", fontSize: "1.25rem", color: "#fff", backgroundColor: "#bccbd2", width: "90%", height: "3rem" },
  "white-s": { padding: "1.2rem", fontSize: "1rem", color: "#333", backgroundColor: "#ffffff", width: "40%", height: "2rem" },
  "white-l": { padding: "1.5rem", fontSize: "1.25rem", color: "#333", backgroundColor: "#ffffff", width: "90%", height: "3rem" },
  "black-s": { padding: "1.2rem", fontSize: "1rem", color: "#fff", backgroundColor: "#3a3b42", width: "40%", height: "2rem" },
  "black-l": { padding: "1.5rem", fontSize: "1.25rem", color: "#fff", backgroundColor: "#3a3b42", width: "90%", height: "3rem" },
};


const defaultStyle = { padding: "8px 16px", fontSize: "14px", color: "#fff", backgroundColor: "#ed798d" };

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  padding: ${({ category }) => (variantStyles[category]?.padding || defaultStyle.padding)};
  font-size: ${({ category }) => (variantStyles[category]?.fontSize || defaultStyle.fontSize)};
  color: ${({ category }) => (variantStyles[category]?.color || defaultStyle.color)};
  background-color: ${({ category }) => (variantStyles[category]?.backgroundColor || defaultStyle.backgroundColor)};

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;