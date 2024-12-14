import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Modal from "react-modal";
import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";
import { IPresentImage } from "../fetcher";

const cardData = [
  {
    id: 1,
    front:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Circle_sign_1.svg/1200px-Circle_sign_1.svg.png",
    back: "https://www.dogsforgood.org/wp-content/uploads/2019/06/Georgie-web.jpg",
  },
  {
    id: 2,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.dogsforgood.org/wp-content/uploads/2019/06/Georgie-web.jpg",
  },

  {
    id: 3,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.google.com/imgres?q=happy%20new%20year&imgurl=https%3A%2F%2Fnistbanepa.edu.np%2Fwp-content%2Fuploads%2F2023%2F04%2Fhappy-new-year.png&imgrefurl=https%3A%2F%2Fnistbanepa.edu.np%2Fnotices_updates%2Fhappy-new-year-2080-bs%2F&docid=V5LJlsd8KlNyKM&tbnid=Ke02gN2kL2fsrM&vet=12ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA..i&w=750&h=450&hcb=2&ved=2ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA",
  },

  {
    id: 4,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.google.com/imgres?q=happy%20new%20year&imgurl=https%3A%2F%2Fnistbanepa.edu.np%2Fwp-content%2Fuploads%2F2023%2F04%2Fhappy-new-year.png&imgrefurl=https%3A%2F%2Fnistbanepa.edu.np%2Fnotices_updates%2Fhappy-new-year-2080-bs%2F&docid=V5LJlsd8KlNyKM&tbnid=Ke02gN2kL2fsrM&vet=12ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA..i&w=750&h=450&hcb=2&ved=2ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA",
  },

  {
    id: 5,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.google.com/imgres?q=happy%20new%20year&imgurl=https%3A%2F%2Fnistbanepa.edu.np%2Fwp-content%2Fuploads%2F2023%2F04%2Fhappy-new-year.png&imgrefurl=https%3A%2F%2Fnistbanepa.edu.np%2Fnotices_updates%2Fhappy-new-year-2080-bs%2F&docid=V5LJlsd8KlNyKM&tbnid=Ke02gN2kL2fsrM&vet=12ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA..i&w=750&h=450&hcb=2&ved=2ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA",
  },

  {
    id: 6,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.dogsforgood.org/wp-content/uploads/2019/06/Georgie-web.jpg",
  },

  {
    id: 7,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.dogsforgood.org/wp-content/uploads/2019/06/Georgie-web.jpg",
  },
];

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

const AnimatedStackedCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IPresentImage>();

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  const captureRefs = useRef<HTMLDivElement | null>();

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
        {cardData.map((card, i) => (
          <Card
            key={card.id}
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
                backgroundImage: `url(${card?.front})`,
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
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)", // 약간의 투명 배경 추가 (선택 사항)
          },
        }}
        ariaHideApp={false} // 접근성 경고 비활성화
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* 앞면 */}
          <div
            style={{
              width: "15rem",
              height: "10rem",
              backgroundImage: `url(${selectedCard?.front})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <ButtonS onClick={() => flipCard()} category="pink">
              Flip to Back
            </ButtonS>
          </div>

          {/* 뒷면 */}
          <div>
            <div ref={(el) => (captureRefs.current = el)}>
              <div
                style={{
                  width: "15rem",
                  height: "10rem",
                  backgroundImage: `url(${selectedCard?.back})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <ButtonS onClick={() => flipCard()} category="hotpink">
              Flip to Front
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

export default AnimatedStackedCards;
