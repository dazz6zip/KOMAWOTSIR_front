import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";

const cardData = [
  {
    id: 1,
    front:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Circle_sign_1.svg/1200px-Circle_sign_1.svg.png",
    back: "https://www.google.com/imgres?q=happy%20new%20year&imgurl=https%3A%2F%2Fnistbanepa.edu.np%2Fwp-content%2Fuploads%2F2023%2F04%2Fhappy-new-year.png&imgrefurl=https%3A%2F%2Fnistbanepa.edu.np%2Fnotices_updates%2Fhappy-new-year-2080-bs%2F&docid=V5LJlsd8KlNyKM&tbnid=Ke02gN2kL2fsrM&vet=12ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA..i&w=750&h=450&hcb=2&ved=2ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA",
  },
  {
    id: 2,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.google.com/imgres?q=happy%20new%20year&imgurl=https%3A%2F%2Fnistbanepa.edu.np%2Fwp-content%2Fuploads%2F2023%2F04%2Fhappy-new-year.png&imgrefurl=https%3A%2F%2Fnistbanepa.edu.np%2Fnotices_updates%2Fhappy-new-year-2080-bs%2F&docid=V5LJlsd8KlNyKM&tbnid=Ke02gN2kL2fsrM&vet=12ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA..i&w=750&h=450&hcb=2&ved=2ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA",
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
    back: "https://www.google.com/imgres?q=happy%20new%20year&imgurl=https%3A%2F%2Fnistbanepa.edu.np%2Fwp-content%2Fuploads%2F2023%2F04%2Fhappy-new-year.png&imgrefurl=https%3A%2F%2Fnistbanepa.edu.np%2Fnotices_updates%2Fhappy-new-year-2080-bs%2F&docid=V5LJlsd8KlNyKM&tbnid=Ke02gN2kL2fsrM&vet=12ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA..i&w=750&h=450&hcb=2&ved=2ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA",
  },

  {
    id: 7,
    front:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
    back: "https://www.google.com/imgres?q=happy%20new%20year&imgurl=https%3A%2F%2Fnistbanepa.edu.np%2Fwp-content%2Fuploads%2F2023%2F04%2Fhappy-new-year.png&imgrefurl=https%3A%2F%2Fnistbanepa.edu.np%2Fnotices_updates%2Fhappy-new-year-2080-bs%2F&docid=V5LJlsd8KlNyKM&tbnid=Ke02gN2kL2fsrM&vet=12ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA..i&w=750&h=450&hcb=2&ved=2ahUKEwiR0tXB7aeKAxV1s1YBHRYXB-QQM3oECHcQAA",
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
    transform: scale(1.5)
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const AnimatedStackedCards = () => {
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const flipCard = (index: number) => {
    setIsFlipped((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };
  const captureRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <CardStack>
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            style={{
              transform: `
            rotateX(-30deg)
            rotateY(-20deg)
            translateZ(${index * +50}px) /* 카드 간 Z축 간격 고정 */
          `,
            }}
          >
            <ReactCardFlip
              isFlipped={isFlipped[index]}
              flipDirection="horizontal"
            >
              <>
                <br />
                <div
                  style={{
                    width: "15rem",
                    height: "10rem",
                    backgroundImage: `url(${card?.front})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex", // Flexbox 적용
                    alignItems: "center", // 수직 가운데 정렬
                    justifyContent: "center", // 수평 가운데 정렬
                  }}
                >
                  <ButtonS
                    onClick={() => flipCard(index)}
                    category="pink"
                  ></ButtonS>
                </div>
              </>
              <>
                <div ref={(el) => (captureRefs.current[index] = el)}>
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
                  >
                    <ButtonS
                      onClick={() => flipCard(index)}
                      category="hotpink"
                    ></ButtonS>
                  </div>
                </div>
              </>
            </ReactCardFlip>
          </Card>
        ))}
      </CardStack>
    </>
  );
};

export default AnimatedStackedCards;
