import axios from "axios";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Modal from "react-modal";
import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";
import { EFontColor, EFontSize, IPresent } from "../fetcher";

const CardStack = styled.div`
  position: relative;
  width: 35%;
  height: 80%;
  margin: 0 auto;
  perspective: 2000px; /* 3D 효과를 위한 원근 */
`;

const Card = styled.div`
  background-color: red;
  position: absolute;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  transform-origin: center; /* 회전 중심 */
  &:hover {
    transform: scale(1.5);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const TestYearly = () => {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IPresent>();
  const [cardData, setCards] = useState<IPresent[]>([]);

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  const captureRefs = useRef<HTMLDivElement | null>();

  const year = new Date().getFullYear();
  useEffect(() => {
    axios
      .get<IPresent[]>(`/api/receivers/${userId}/posts/2025`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("연하장 목록 불러오기 실패:", error);
      });
  }, []);

  const handleDownload = async () => {
    const targetRef = captureRefs.current;
    if (targetRef) {
      const canvas = await html2canvas(targetRef, {
        useCORS: true, // CORS 사용
        allowTaint: false, // Cross-Origin 이미지를 제대로 처리
      });
      const dataURL = canvas.toDataURL("image/png"); // PNG 형식 이미지
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `present.png`;
      link.click();
    }
  };

  const selectCard = (i: number) => {
    setSelectedCard(cardData[i]);
    setIsModalOpen(true);
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <CardStack>
        {cardData?.map((card, i) => (
          <Card
            key={card.postId}
            style={{
              transform: `rotateX(-30deg) rotateY(-20deg) translateZ(${
                i * 50
              }px)`,
            }}
          >
            <div
              style={{
                width: "15rem",
                height: "10rem",
                backgroundImage: `url(${card?.backgroundPic})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <ButtonS
                onClick={() => {
                  selectCard(i);
                }}
                category="pink"
              >
                카드 보기
              </ButtonS>
            </div>
          </Card>
        ))}
      </CardStack>

      <Modal
        isOpen={isModalOpen}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "transparent", // 배경색 제거
            border: "none", // 경계선 제거
            padding: "0", // 내부 여백 제거
            width: "auto",
            height: "auto",
            overflow: "hidden",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)", // 약간의 투명 배경 추가 (선택 사항)
          },
        }}
        ariaHideApp={false} // 접근성 경고 비활성화
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* 앞면 */}
          <div>
            <div
              style={{
                width: "15rem",
                height: "10rem",
                backgroundImage: `url(${selectedCard?.thumbnailPic})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <ButtonS onClick={() => setIsModalOpen(false)} category="gray">
              닫기
            </ButtonS>
            <ButtonS onClick={() => flipCard()} category="pink">
              편지 읽기
            </ButtonS>
          </div>

          {/* 뒷면 */}
          <div>
            <div ref={(el) => (captureRefs.current = el)}>
              <div
                style={{
                  width: "15rem",
                  height: "10rem",
                  backgroundImage: `url(${selectedCard?.backgroundPic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex", // Flexbox 적용
                  alignItems: "center", // 수직 가운데 정렬
                  justifyContent: "center", // 수평 가운데 정렬
                  textAlign: "center",
                  color: `${
                    selectedCard?.fontColor === EFontColor.white
                      ? "white"
                      : "black"
                  }`,
                }}
              >
                <span
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: `${selectedCard?.fontName}`,
                    fontSize: `${
                      selectedCard?.fontSize === EFontSize.defaultSize ? 16 : 24
                    }`,
                    color: `${selectedCard?.fontColor}`,
                  }}
                >
                  <link href={selectedCard?.fontUrl} rel="stylesheet" />
                  <br />
                  {selectedCard?.contents}
                  <br />
                  <br />
                  <br />
                  <b>from. {selectedCard?.senderNickname}</b>
                </span>
              </div>
            </div>
            <ButtonS onClick={() => setIsModalOpen(false)} category="gray">
              닫기
            </ButtonS>
            <ButtonS onClick={() => flipCard()} category="hotpink">
              앞면보기
            </ButtonS>
            <ButtonS category="pink" onClick={() => handleDownload()}>
              이미지 다운로드
            </ButtonS>
          </div>
        </ReactCardFlip>
      </Modal>
    </>
  );
};

export default TestYearly;
