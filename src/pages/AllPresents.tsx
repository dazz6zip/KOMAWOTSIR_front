import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import { AReceiverState } from "../atoms";
import ButtonS from "../components/common/ButtonS";
import {
  CardContainer,
  CardStyled,
  CarouselWrapper,
  NavigationButton,
} from "../components/common/CarouselStyle1";
import Description from "../components/common/Description";
import { Select } from "../components/common/Select";
import Title from "../components/common/Title";
import { EFontColor, EFontSize, IPresent } from "../fetcher";

const AllPresents: React.FC = () => {
  const [active, setActive] = useState(0);
  const receiver = useRecoilValue(AReceiverState);

  const [cards, setCards] = useState<IPresent[]>();
  const [cardsByYear, setCardsByYear] = useState<IPresent[]>();
  const [yearList, setYearList] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(2024);
  const openSelect = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const captureRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 카드별 ref 배열

  useEffect(() => {
    axios
      // .get<IPresent[]>(`/api/receivers/${receiver.id}/posts`)
      .get<IPresent[]>("api/posts/all")
      .then((response) => {
        setCards(response.data);
        const years = Array.from(
          new Set(response.data.map((card) => card.year))
        ).sort((a, b) => a - b); // Set 객체로 중복 자동 제거, sort로 오름차순 정렬(둘을 빼서 음수면 a앞에 ..)
        setYearList(years);
        setCount(response.data.length);
      })
      .catch((error) => {
        console.error("연하장 목록 불러오기 실패:", error);
      });
  }, []);

  useEffect(() => {}, [selectedOption]);

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
      link.download = `card-${index + 1}.png`;
      link.click();
    }
  };

  return (
    <>
      <Title>연하장 수신 목록</Title>
      <br />
      <br />
      <Select isOpen={isOpen}>
        <div className="select-btn" onClick={openSelect}>
          {selectedOption}
          <i>▼</i>
        </div>
        <div className="options">
          {yearList.map((year) => (
            <div className="option" onClick={() => handleOptionClick(year)}>
              {year}
            </div>
          ))}
        </div>
        <br />
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
                <div
                  ref={(el) => (captureRefs.current[i] = el)}
                  // 각 카드별 ref 할당
                  style={{
                    width: "12rem",
                    height: "12rem",
                    backgroundImage: `url(${card?.backgroundPic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex", // Flexbox 적용
                    alignItems: "center", // 수직 가운데 정렬
                    justifyContent: "center", // 수평 가운데 정렬
                    textAlign: "center",
                    color: `${
                      card?.fontColor === EFontColor.white ? "white" : "black"
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
                    }}
                  >
                    <link href={card?.fontUrl} rel="stylesheet" />
                    <br />
                    {card.contents}
                    <br />
                    <br />
                    <br />
                    <b>from. {card.senderNickname}</b>
                  </span>
                </div>
              </div>
              <br />
              <ButtonS category="pink" onClick={() => handleDownload(i)}>
                이미지 다운로드
              </ButtonS>
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

export default AllPresents;
