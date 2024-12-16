import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AReceiverState } from "../atoms";
import ButtonS from "../components/common/ButtonS";
import {
  CardContainer,
  CardStyled,
  CarouselWrapper,
  NavigationButton,
} from "../components/common/CarouselStyle1";
import Description from "../components/common/Description";
import Title from "../components/common/Title";
import { EFontColor, EFontSize, IPresent } from "../fetcher";

const Card = styled.div``;

const TestAllPresents: React.FC = () => {
  const [active, setActive] = useState(0);
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const receiver = useRecoilValue(AReceiverState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [filteredCards, setFilteredCards] = useState<IPresent[]>([]);
  const [cards, setCards] = useState([
    {
      postId: 1,
      senderId: "hi",
      receiverId: "hihi",
      year: 2024,
      thumbnailPic:
        "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
      backgroundPic:
        "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg ",
      fontColor: "black",
      fontName: "Arial",
      contents: "Happy New Year!",
      senderNickname: "Alice",
    },
    {
      postId: 2,
      year: 2023,
      senderId: "hi",
      receiverId: "hihi",
      thumbnailPic:
        "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg ",
      backgroundPic:
        "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg ",
      fontColor: "white",
      fontName: "Verdana",
      contents: "Best Wishes!",
      senderNickname: "Bob",
    },
    // Add more test data as needed
  ]);
  const [count, setCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);

  const flipCard = (index: number) => {
    setIsFlipped((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  const captureRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 카드별 ref 배열

  useEffect(() => {
    setFilteredCards(cards);
    setCount(cards.length);
    setIsFlipped(new Array(cards.length).fill(false));
  }, [cards]);

  useEffect(() => {
    updateFilterdCards();
  }, [selectedOption]);

  const updateFilterdCards = () => {
    let filtered;

    if (selectedOption === 0) {
      filtered = cards;
    } else {
      filtered = cards.filter((card) => card.year === selectedOption);
    }

    setFilteredCards(filtered);
    setCount(filtered.length);
    setActive(0);
  };

  useEffect(() => {
    updateFilterdCards();
  }, [selectedOption, cards]);

  const handleDownload = async (index: number) => {
    const targetRef = captureRefs.current[index];
    if (targetRef) {
      const canvas = await html2canvas(targetRef, {
        useCORS: true, // CORS 사용
        allowTaint: false,
      });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `thumbnail-${index + 1}.png`;
      link.click();
    }
  };

  return (
    <>
      <Title>연하장 수신 목록</Title>
      <br />
      <br />

      <CarouselWrapper>
        {active > 0 && (
          <NavigationButton
            direction="left"
            onClick={() => setActive((i) => i - 1)}
          >
            <TiChevronLeftOutline color="#eeb0b2" />
          </NavigationButton>
        )}
        {filteredCards?.map((card, i) => (
          <CardContainer
            key={card.postId}
            offset={(active - i) / 3}
            absOffset={Math.abs(active - i) / 3}
            direction={Math.sign(active - i)}
            active={i === active}
          >
            <CardStyled absOffset={Math.abs(active - i) / 3}>
              <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <ReactCardFlip
                  isFlipped={isFlipped[i]}
                  flipDirection="horizontal"
                >
                  <Card onClick={() => flipCard(i)}>
                    <Description>클릭해서 내용을 확인해보세요!</Description>
                    <br />
                    <div
                      style={{
                        width: "15rem",
                        height: "10rem",
                        backgroundImage: `url(${card?.thumbnailPic})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex", // Flexbox 적용
                        alignItems: "center", // 수직 가운데 정렬
                        justifyContent: "center", // 수평 가운데 정렬
                        textAlign: "center",
                        color: `${
                          card?.fontColor === EFontColor.white
                            ? "white"
                            : "black"
                        }`,
                      }}
                    >
                      <span
                        style={{
                          whiteSpace: "pre-wrap",
                          fontFamily: `${card?.fontName}`,
                          fontSize: `${
                            card?.fontSize === EFontSize.defaultSize ? 16 : 24
                          }`,
                          color: `${card?.fontColor}`,
                        }}
                      ></span>
                    </div>
                  </Card>
                  <Card onClick={() => flipCard(i)}>
                    <div ref={(el) => (captureRefs.current[i] = el)}>
                      <div
                        style={{
                          width: "15rem",
                          height: "10rem",
                          backgroundImage: `url(${card?.backgroundPic})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "flex", // Flexbox 적용
                          alignItems: "center", // 수직 가운데 정렬
                          justifyContent: "center", // 수평 가운데 정렬
                          textAlign: "center",
                          color: `${
                            card?.fontColor === EFontColor.white
                              ? "white"
                              : "black"
                          }`,
                        }}
                      >
                        <span
                          style={{
                            whiteSpace: "pre-wrap",
                            fontFamily: `${card?.fontName}`,
                            fontSize: `${
                              card?.fontSize === EFontSize.defaultSize ? 16 : 24
                            }`,
                            color: `${card?.fontColor}`,
                          }}
                        >
                          <link href={card?.fontUrl} rel="stylesheet" />
                          <br />
                          {card?.contents}
                          <br />
                          <br />
                          <br />
                          <b>from. {card?.senderNickname}</b>
                        </span>
                      </div>
                    </div>
                    <br />
                    <ButtonS category="pink" onClick={() => handleDownload(i)}>
                      이미지 다운로드
                    </ButtonS>
                  </Card>
                </ReactCardFlip>
              </div>
            </CardStyled>
          </CardContainer>
        ))}
        {active < count - 1 && (
          <NavigationButton
            direction="right"
            onClick={() => setActive((i) => i + 1)}
          >
            <TiChevronRightOutline color="#eeb0b2" />
          </NavigationButton>
        )}
      </CarouselWrapper>
      <br />
      <br />
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

export default TestAllPresents;
