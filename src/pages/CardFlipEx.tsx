import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";
import { Card } from "../StyledComponents";

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
