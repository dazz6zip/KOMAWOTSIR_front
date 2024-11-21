import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import ButtonRow from "../components/common/ButtonRow";

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: normal;
  color: #333;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#d9d9d9" : "#f5f5f5")};
  color: ${(props) => (props.isActive ? "#000" : "#888")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#c0c0c0" : "#e0e0e0")};
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

const ColorBox = styled.div<{ color: string; isSelected: boolean }>`
  width: 100%;
  padding-top: 75%; /* 4:3 Aspect Ratio */
  position: relative;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.isSelected ? "4px solid #000" : "none")};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;



function BackgroundList() {
  const [activeTab, setActiveTab] = useState("단색");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colors = ["#ff6b6b", "#ffa8a8", "#74c0fc", "#a5d8ff", "#343a40", "#f1f3f5"];

  return (
    <>
      <Header>
        <Title>2025 연하장</Title>
        <SubTitle>디자인 썸네일 변경하기</SubTitle>
      </Header>

      <Tabs>
        {["단색", "그래디언트", "일러스트", "시즌"].map((tab) => (
          <Tab
            key={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>

      <ColorGrid>
        {colors.map((color) => (
          <ColorBox
            key={color}
            color={color}
            isSelected={selectedColor === color}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </ColorGrid>

      <ButtonRow>
        <Button category="pink-s">+ 직접 등록하기</Button>
        <Button category="hotpink-s">저장하기</Button>
      </ButtonRow>
    </>
  );
}

export default BackgroundList;
