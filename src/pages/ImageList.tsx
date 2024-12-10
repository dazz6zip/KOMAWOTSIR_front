import React, { useState } from "react";
import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import ButtonRow from "../components/common/ButtonRow";
import { useQuery } from "react-query";
import { Iimage, imageLoad } from "../fetcher";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ADesignState } from "../atoms";
import axios from "axios";
import {
  ColorBox,
  ColorGrid,
  Header,
  InputFile,
  PreviewContainer,
  SubTitle,
  Tab,
  Tabs,
  Title,
} from "../StyledComponents";

function BackgroundList() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const location = useLocation() as {
    state: { isFront: boolean };
  };

  const nav = useHistory();

  const FrontOrBack = location.state.isFront ? "배경" : "썸네일";

  const [selectImageId, setSelectImageId] = useState<number>();
  const [selectImageUrl, setSelectImageUrl] = useState<string>();
  const [colors, setColors] = useState<Iimage[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL 추가
  const [finalCategory, setFinalCategory] = useState<string>("단색");

  const category = ["단색", "그라데이션", "직접 업로드", "시즌"];

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
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
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

      const fileUrl = response.data;

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
      {finalCategory === "직접 업로드" && (
        <InputFile>
          {previewUrl && (
            <PreviewContainer>
              <img src={previewUrl} alt="미리보기" />
            </PreviewContainer>
          )}
          <input type="file" accept="*" onChange={handleFileChange} />
        </InputFile>
      )}
      <ButtonRow>
        {finalCategory === "직접 업로드" && (
          <ButtonL category="blue" onClick={() => customImageUpload()}>
            사진등록
          </ButtonL>
        )}
        <ButtonL category="pink" onClick={() => saveImage()}>
          저장하기
        </ButtonL>
      </ButtonRow>
    </>
  );
}

export default BackgroundList;
