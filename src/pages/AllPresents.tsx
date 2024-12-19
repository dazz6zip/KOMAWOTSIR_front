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
import { Select } from "../components/common/Select";
import Title from "../components/common/Title";
import { IPresent } from "../fetcher";

const Card = styled.div``;

const AllPresents: React.FC = () => {
  const [active, setActive] = useState(0);
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const [filteredCards, setFilteredCards] = useState<IPresent[]>([]);
  const [cards, setCards] = useState<IPresent[]>([]);
  const [yearList, setYearList] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);

  const flipCard = (index: number) => {
    setIsFlipped((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };
  const openSelect = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const captureRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 카드별 ref 배열

  useEffect(() => {
    axios
      .get<IPresent[]>(`/api/receivers/${userId}/posts/all`)
      .then((response) => {
        setLoading(true);
        setCards(response.data);
        const years = Array.from(
          new Set(response.data.map((card) => card.year))
        ).sort((a, b) => a - b); // Set 객체로 중복 자동 제거, sort로 오름차순 정렬(둘을 빼서 음수면 a앞에 ..)
        setYearList([0, ...years]);
        updateFilterdCards();
        setFilteredCards(response.data);
        setCount(response.data.length);

        // 초기 isFlipped 배열 설정
        setIsFlipped(new Array(response.data.length).fill(false));
        setLoading(false);
      })
      .catch((error) => {
        console.error("연하장 목록 불러오기 실패:", error);
      });
  }, []);

  const updateFilterdCards = () => {
    let filtered; // 필터링된 결과를 저장할 변수

    if (selectedOption === 0) {
      // "전체보기" 선택 시 모든 카드 표시
      filtered = cards;
    } else {
      // 선택된 연도에 따라 필터링
      filtered = cards.filter((card) => card.year === selectedOption);
    }

    setFilteredCards(filtered); // 상태 업데이트
    setCount(filtered.length); // 필터링된 길이를 바로 설정
    setActive(0); // 필터링 변경 시 active 카드 초기화
  };

  useEffect(() => {
    updateFilterdCards();
  }, [selectedOption, cards]);

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

  const handleSendToBackend = async (index: number, postId: number) => {
    const targetRef = captureRefs.current[index];
    if (targetRef) {
      try {
        // 캔버스 생성
        const canvas = await html2canvas(targetRef, {
          useCORS: true,
          allowTaint: false,
        });

        // 이미지 데이터 URL 변환
        const dataURL = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataURL)).blob(); // Blob으로 변환

        // FormData 생성
        const formData = new FormData();
        formData.append("image", blob, `post-${postId}.png`); // 백엔드에서 받을 필드명과 파일명

        // POST 요청
        const response = await axios.post("/api/posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // FormData 전송 헤더
          },
        });
        console.log("이미지 업로드 성공:", response.data);
        alert("이미지가 성공적으로 업로드되었습니다!");
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  const makeImage = async (postId: number) => {
    try {
      await axios.get(`/api/posts/image/${postId}`);
    } catch (err) {
      alert("err: " + err);
    }
  };

  return (
    <>
      <Title>연하장 수신 목록</Title>
      {filteredCards.length === 0 ? (
        <h2>도착한 연하장이 없어요.</h2>
      ) : (
        <div>
          <br />
          <br />
          <Select isOpen={isOpen}>
            <div className="select-btn" onClick={openSelect}>
              {selectedOption === 0 ? "전체" : `${selectedOption}년`}
              <i>▼</i>
            </div>
            <div className="options">
              {yearList.map((year) => (
                <div
                  key={year}
                  className="option"
                  onClick={() => handleOptionClick(year)}
                >
                  {year == 0 ? "전체" : `${year}년`}
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
                      <div onClick={() => flipCard(i)}>
                        <Description>클릭해서 내용을 확인해보세요!</Description>
                        <br />
                        <div
                          style={{
                            width: "15rem",
                            height: "10rem",
                            backgroundImage: `url(${card?.front})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                          }}
                        ></div>
                      </div>
                      <div onClick={() => flipCard(i)}>
                        <div ref={(el) => (captureRefs.current[i] = el)}>
                          <div
                            style={{
                              width: "15rem",
                              height: "10rem",
                              backgroundImage: `url(${card?.back})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              display: "flex", // Flexbox 적용
                              alignItems: "center", // 수직 가운데 정렬
                              justifyContent: "center", // 수평 가운데 정렬
                              textAlign: "center",
                            }}
                          ></div>
                        </div>
                        <br />
                        <ButtonS
                          category="pink"
                          onClick={() => handleDownload(i)}
                        >
                          이미지 다운로드
                        </ButtonS>
                        <ButtonS
                          category="pink"
                          onClick={() => handleSendToBackend(i, card.postId)}
                        >
                          서버로 이미지 전송
                        </ButtonS>
                        <ButtonS
                          category="hotpink"
                          onClick={() => makeImage(card.postId)}
                        >
                          이미지 저장처리 테스트
                        </ButtonS>
                      </div>
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
        </div>
      )}
    </>
  );
};

export default AllPresents;
