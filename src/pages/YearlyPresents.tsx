import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import styled from "styled-components";
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

// 틀 (효선 : 지우면 안 됨;;)
const Card = styled.div``;

const YearlyPresents: React.FC = () => {
  const [active, setActive] = useState(0);
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const [cards, setCards] = useState<IPresent[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);

  const flipCard = (index: number) => {
    setIsFlipped((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  const captureRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 카드별 ref 배열

  const year = new Date().getFullYear();
  console.log(year);
  console.log(year - 1);
  useEffect(() => {
    axios
      .get<IPresent[]>(`/api/receivers/${userId}/posts/${year - 1}`)
      // .get<IPresent[]>(`/api/receivers/${userId}/posts/${year}`)
      .then((response) => {
        console.log(response.data);
        setCards(response.data);
        setCount(response.data.length);

        setIsFlipped(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("연하장 목록 불러오기 실패:", error);
      });
  }, []);

  const handleDownload = async (index: number) => {
    const targetRef = captureRefs.current[index];
    if (targetRef) {
      const canvas = await html2canvas(targetRef, {
        useCORS: true, // CORS 사용
        allowTaint: false, // Cross-Origin 이미지를 제대로 처리
      });
      const dataURL = canvas.toDataURL("image/png"); // PNG 형식 이미지
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `thumbnail-${index + 1}.png`;
      link.click();
    }
  };

  return (
    <>
      <Title>{year} 연하장 수신 목록</Title>
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
        {cards?.map((card, i) => (
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
                      // 각 카드별 ref 할당
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
                        // 각 카드별 ref 할당
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

export default YearlyPresents;
