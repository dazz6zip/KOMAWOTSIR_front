import React, { useState } from "react";
import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import ButtonRow from "../components/common/ButtonRow";
import { useQuery } from "react-query";
import { EImageCategory, Iimage, imageLoad } from "../fetcher";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ADesignState } from "../atoms";
import axios from "axios";

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

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
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

const ColorBox = styled.div<{ color: string; isSelected: boolean }>`
  width: 100%;
  padding-top: 75%; /* 4:3 Aspect Ratio */
  position: relative;
  background-image: url(${(props) => `image/${props.color}`});
  background-size: contain;
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
  const location = useLocation() as {
    state: { isFront: boolean };
  };

  const nav = useHistory();

  const FrontOrBack = location.state.isFront ? "배경" : "썸네일";

  const [selectImageId, setSelectImageId] = useState<number>();
  const [selectImageUrl, setSelectImageUrl] = useState<string>();
  const [colors, setColors] = useState<Iimage[]>([]);
  const [file, setFile] = useState<File | null>(null); // 파일 업로드 상태 추가
  const [finalCategory, setFinalCategory] = useState<string>("단색");

  const category = ["단색", "그라데이션", "직접 업로드", "시즌"];

  const userId = 5;
  // const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const { isLoading, data } = useQuery<Iimage[]>(
    ["LoadDesign", finalCategory],
    () => imageLoad(finalCategory, userId, location.state.isFront),
    {
      onSuccess: (data) => {
        setColors(data);
      },
    }
  );

  const [design, setDesign] = useRecoilState(ADesignState);

  const saveImage = () => {
    setDesign((prevDesign) => ({
      ...prevDesign,
      ...(location.state.isFront
        ? {
            backgroundPic: selectImageUrl,
            backgroundId: selectImageId,
          }
        : {
            thumbnailPic: selectImageUrl,
            thumbnailId: selectImageId,
          }),
    }));
    nav.push("../design");
  };

  const selectImageProc = (imageId: number, url: string) => {
    setSelectImageUrl(url);
    setSelectImageId(imageId);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const customImageUpload = async () => {
    if (!file) {
      alert("업로드할 파일을 선택하세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", String(userId));

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const fileUrl = response.data; // 서버에서 반환된 업로드된 파일 URL

      setSelectImageUrl(fileUrl as string);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
    }
  };

  return (
    <>
      <Header>
        <Title>2025 연하장</Title>
        <SubTitle>디자인 {FrontOrBack} 변경하기</SubTitle>
      </Header>

      <Tabs>
        {category.map((tab) => (
          <Tab
            key={tab}
            isActive={finalCategory === tab}
            onClick={() => setFinalCategory(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>

      <ColorGrid>
        {colors.map((color) => (
          <ColorBox
            key={color.id}
            color={color.pic}
            isSelected={selectImageId === color.id}
            onClick={() => selectImageProc(color.id, color.pic)}
          ></ColorBox>
        ))}
      </ColorGrid>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <ButtonRow>
        <ButtonL category="blue" onClick={() => customImageUpload()}>
          + 직접 등록하기
        </ButtonL>
        <ButtonL category="pink" onClick={() => saveImage()}>
          저장하기
        </ButtonL>
      </ButtonRow>
    </>
  );
}

export default BackgroundList;
