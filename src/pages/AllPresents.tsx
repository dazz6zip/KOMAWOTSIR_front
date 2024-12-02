import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { AReceiverState } from "../atoms";
import {
  CardContainer,
  CardStyled,
  CarouselWrapper,
  NavigationButton,
} from "../components/common/CarouselStyle1";
import Description from "../components/common/Description";
import { Select } from "../components/common/Select";
import Title from "../components/common/Title";
import { IPresent, PresentLoad } from "../fetcher";
import thumbnail from "../images/thumbnail.png";

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

const AllPresents: React.FC = () => {
  const [active, setActive] = useState(0);
  const receiverId = 2;
  const receiver = useRecoilValue(AReceiverState);

  const [cards, setCards] = useState<IPresent[]>();
  const [yearList, setYearList] = useState<number[]>([]);

  const count = images.length;

  useEffect(() => {
    axios
      .get<IPresent[]>(`/api/receivers/${receiver.id}/posts`)
      .then((response) => {
        setCards(response.data);
        const years = Array.from(
          new Set(response.data.map((card) => card.year))
        ).sort((a, b) => a - b); // Set 객체로 중복 자동 제거, sort로 오름차순 정렬(둘을 빼서 음수면 a앞에 ..)
        setYearList(years);
      })
      .catch((error) => {
        console.error("연하장 목록 불러오기 실패:", error);
      });
  }, []);

  const { isLoading, data } = useQuery<IPresent[]>(
    ["presentLoad", receiverId],
    () => PresentLoad(receiverId)
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(2024);
  const openSelect = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
      <Title>연하장 수신 목록</Title>
      <Select isOpen={isOpen}>
        <div className="select-btn" onClick={openSelect}>
          {selectedOption}
          <i>▼</i>
        </div>
        <div className="options">
          {yearList.map((year) => {
            <div className="option" onClick={() => handleOptionClick(year)}>
              {year}
            </div>;
          })}
        </div>
      </Select>
      <CarouselWrapper>
        {active > 0 && (
          <NavigationButton
            direction="left"
            onClick={() => setActive((i) => i - 1)}
          >
            <TiChevronLeftOutline />
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
              <h2>{image.name}</h2>
              <p>{image.category}</p>
            </CardStyled>
          </CardContainer>
        ))}
        {active < count - 1 && (
          <NavigationButton
            direction="right"
            onClick={() => setActive((i) => i + 1)}
          >
            <TiChevronRightOutline />
          </NavigationButton>
        )}
      </CarouselWrapper>
      <Description>
        연하장을 클릭하면 내용을 확인할 수 있어요!
        <br />
        스크롤해서 다른 연하장들도 확인해 보세요.
      </Description>
      <br />
      <br />
    </>
  );
};

export default AllPresents;
