import styled from "styled-components";

const COLORS = {
  hotpink: "#ED798D",
  pink: "#EEB0B2",
  gray: "#BCCBD2",
  black: "#3A3B42",
};

const CARD_SIZE_DESKTOP = "23rem";
const CARD_SIZE_MOBILE = "16rem";

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: linear-gradient(45deg, ${COLORS.hotpink}, ${COLORS.pink});
  font-family: "Montserrat", sans-serif;

  @media (max-width: 768px) {
    background-image: linear-gradient(
      135deg,
      ${COLORS.hotpink},
      ${COLORS.pink}
    );
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: ${CARD_SIZE_DESKTOP};
  height: ${CARD_SIZE_DESKTOP};
  perspective: 500px;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    width: ${CARD_SIZE_MOBILE};
    height: ${CARD_SIZE_MOBILE};
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
  transform: rotateY(${(props) => props.offset * 50}deg)
    scaleY(${(props) => 1 + props.absOffset * -0.4})
    translateZ(${(props) => props.absOffset * -30}rem)
    translateX(${(props) => props.direction * -5}rem);
  filter: blur(${(props) => props.absOffset}rem);
  transition: all 0.3s ease-out;
  display: ${(props) => (props.absOffset > 3 ? "none" : "block")};
  opacity: ${(props) => (props.absOffset >= 3 ? 0 : 1)};

  @media (max-width: 768px) {
    transform: rotateY(${(props) => props.offset * 30}deg)
      scaleY(${(props) => 1 + props.absOffset * -0.3})
      translateZ(${(props) => props.absOffset * -20}rem)
      translateX(${(props) => props.direction * -3}rem);
    filter: blur(${(props) => props.absOffset * 0.8}rem);
  }
`;

export const CardStyled = styled.div<{ absOffset: number }>`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: hsl(
    280deg,
    40%,
    calc(100% - ${(props) => props.absOffset * 50}%)
  );
  border-radius: 1rem;
  color: ${COLORS.gray};
  text-align: justify;
  transition: all 0.3s ease-out;

  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.7em;
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

export const NavigationButton = styled.button<{ direction: "left" | "right" }>`
  color: white;
  font-size: 5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;
  transform: translateY(-50%)
    ${(props) =>
      props.direction === "left" ? "translateX(-100%)" : "translateX(100%)"};
  right: ${(props) => (props.direction === "right" ? "0" : "unset")};

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;
