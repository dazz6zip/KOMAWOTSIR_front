import styled from "styled-components";

const COLORS = {
  hotpink: "#ED798D",
  pink: "#EEB0B2",
  gray: "#BCCBD2",
  black: "#3A3B42",
};

const CARD_SIZE_DESKTOP = "23rem";
const CARD_SIZE_MOBILE = "16rem";

export const CarouselWrapper = styled.div`
  position: relative;
  width: ${CARD_SIZE_DESKTOP};
  height: ${CARD_SIZE_DESKTOP};
  perspective: 800px; /* 깊이를 위한 3D */
  transform-style: preserve-3d;

  @media (max-width: 1024px) {
    width: 20rem;
    height: 20rem;
    perspective: 600px;
  }

  @media (max-width: 768px) {
    width: ${CARD_SIZE_MOBILE};
    height: ${CARD_SIZE_MOBILE};
    perspective: 400px;
  }

  @media (max-width: 480px) {
    width: 14rem;
    height: 14rem;
    perspective: 300px;
  }
`;

export const CardContainer = styled.div<{
  offset: number;
  absOffset: number;
  direction: number;
  active: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateX(${(props) => props.offset * 50}deg)
    scale(${(props) => 1 + props.absOffset * -0.4})
    translateZ(${(props) => props.absOffset * -30}rem)
    translateY(${(props) => props.direction * -2.5}rem); /* 간격 설정 */
  filter: blur(${(props) => props.absOffset}rem);
  transition: all 0.3s ease-out;
  display: ${(props) => (props.absOffset > 3 ? "none" : "block")};
  opacity: ${(props) => (props.absOffset >= 3 ? 0 : 1)};

  @media (max-width: 768px) {
    transform: rotateX(${(props) => props.offset * 30}deg)
      scale(${(props) => 1 + props.absOffset * -0.3})
      translateZ(${(props) => props.absOffset * -20}rem)
      translateY(${(props) => props.direction * -2}rem);
    filter: blur(${(props) => props.absOffset * 0.8}rem);
  }
`;

export const CardStyled = styled.div<{ absOffset: number }>`
  width: 100%;
  padding: 2rem;
  background-color: hsl(
    340deg,
    60%,
    calc(100% - ${(props) => props.absOffset * 30}%)
  );
  border-radius: 1rem;
  color: ${COLORS.gray};
  text-align: justify;
  transition: all 0.3s ease-out;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.3em 0 0.7em;
    color: ${COLORS.black};
  }

  p,
  h2 {
    transition: all 0.3s ease-out;
    opacity: ${(props) => (props.absOffset === 0 ? 1 : 0.5)};
  }

  @media (max-width: 768px) {
    padding: 1rem;
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

export const NavigationButton = styled.button<{ direction: "up" | "down" }>`
  color: pink;
  font-size: 5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;
  transform: translateX(-50%)
    ${(props) =>
      props.direction === "up" ? "translateY(-100%)" : "translateY(100%)"};
  top: ${(props) => (props.direction === "up" ? "0" : "unset")};
  bottom: ${(props) => (props.direction === "down" ? "0" : "unset")};

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;
