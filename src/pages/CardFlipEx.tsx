import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";

const Card = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 30px auto;
  background: pink;
`;

function CardFlipEx() {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card onClick={flipCard}>hi</Card>
        <Card onClick={flipCard}>bye</Card>
      </ReactCardFlip>
    </div>
  );
}

export default CardFlipEx;
