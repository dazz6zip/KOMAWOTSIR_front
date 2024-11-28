import React, { useState } from "react";
import { CiSquareChevUp, CiSquareChevDown } from "react-icons/ci";
import thumbnail from "../images/thumbnail.png";
import {
  CarouselWrapper,
  CardContainer,
  CardStyled,
  NavigationButton,
} from "../components/common/CarouselStyles";
import Title from "../components/common/Title";
import DescriptionS from "../components/common/DescriptionS";

interface ImageDto {
  id: number;
  category: "SOLID" | "GRADATION" | "SEASON" | "CUSTOM";
  name: string;
  pic: string;
  isFront: boolean;
  sourceType: "SERVICE" | "USER";
  userId?: number;
}

// 임시 데이터
const images: ImageDto[] = [
  {
    id: 1,
    category: "SOLID",
    name: "Solid Image",
    pic: "",
    isFront: true,
    sourceType: "SERVICE",
  },
  {
    id: 2,
    category: "GRADATION",
    name: "Gradient Image",
    pic: "",
    isFront: false,
    sourceType: "USER",
    userId: 123,
  },
  {
    id: 3,
    category: "SEASON",
    name: "Season Image",
    pic: "",
    isFront: true,
    sourceType: "SERVICE",
  },
  {
    id: 4,
    category: "SOLID",
    name: "Solid Image",
    pic: "",
    isFront: true,
    sourceType: "SERVICE",
  },
  {
    id: 5,
    category: "GRADATION",
    name: "Gradient Image",
    pic: "",
    isFront: false,
    sourceType: "USER",
    userId: 123,
  },
  {
    id: 6,
    category: "SEASON",
    name: "Season Image",
    pic: "",
    isFront: true,
    sourceType: "SERVICE",
  },
];

function CardList() {
  const [active, setActive] = useState(0);

  const count = images.length;

  return (
    <>
      <Title>2025 내가 받은 연하장</Title>
      <CarouselWrapper>
        {active > 0 && (
          <NavigationButton
            direction="up"
            onClick={() => setActive((i) => i - 1)}
          >
            <CiSquareChevUp />
          </NavigationButton>
        )}
        {images.map((image, i) => (
          <CardContainer
            key={image.id}
            offset={(active - i) / 3}
            absOffset={Math.abs(active - i) / 3}
            direction={Math.sign(active - i)}
            active={i === active}
          >
            <CardStyled absOffset={Math.abs(active - i) / 3}>
              <img
                src={thumbnail}
                alt={image.name}
                style={{ width: "100%", borderRadius: "1rem" }}
              />
              <DescriptionS align="center">
                클릭하여 내용을 확인하세요!
              </DescriptionS>
            </CardStyled>
          </CardContainer>
        ))}
        {active < count - 1 && (
          <NavigationButton
            direction="down"
            onClick={() => setActive((i) => i + 1)}
          >
            <CiSquareChevDown />
          </NavigationButton>
        )}
      </CarouselWrapper>

      <DescriptionS>
        연하장을 클릭하면 내용을 확인할 수 있어요!
        <br />
        스크롤해서 다른 연하장들도 확인해 보세요.
      </DescriptionS>
    </>
  );
}

export default CardList;
