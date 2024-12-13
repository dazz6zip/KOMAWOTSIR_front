import React, { useState } from "react";
import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import ButtonRow from "../components/common/ButtonRow";
import { useQuery } from "react-query";
import { EFontColor, Iimage, imageLoad } from "../fetcher";
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
import { toast } from "react-toastify";

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

  // const saveImage = () => {
  //   setDesign((prevDesign) => ({
  //     ...prevDesign,
  //     ...(location.state.isFront
  //       ? {
  //           backgroundPic: selectImageUrl,
  //           backgroundId: selectImageId,
  //         }
  //       : {
  //           thumbnailPic: selectImageUrl,
  //           thumbnailId: selectImageId,
  //         }),
  //   }));
  //   nav.push("../design");
  // };

  const saveImage = async () => {
    let imageBrightState = EFontColor.black;

    if (location.state.isFront) {
      try {
        // Fetch로 이미지 Blob 가져오기
        const response = await fetch(selectImageUrl as string, {
          mode: "cors",
        });
        if (!response.ok) throw new Error("Failed to fetch image");

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob); // Blob URL 생성

        const img = new Image();
        img.src = imgUrl;

        img.onload = () => {
          // Canvas 생성
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Canvas 크기를 이미지 크기로 설정
          canvas.width = img.width;
          canvas.height = img.height;

          if (!ctx) {
            console.error("CanvasRenderingContext2D를 가져오지 못했습니다.");
            return;
          }

          // 이미지를 Canvas에 그리기
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // 이미지 데이터 가져오기
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const data = imageData.data;

          // 밝기 계산
          let totalBrightness = 0;
          const totalPixels = data.length / 4; // 픽셀 개수 (R, G, B, A 4바이트씩)

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]; // Red
            const g = data[i + 1]; // Green
            const b = data[i + 2]; // Blue

            // 밝기 계산 (가중 평균 방식)
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            totalBrightness += brightness;
          }

          const averageBrightness = totalBrightness / totalPixels;

          if (averageBrightness > 127.5) {
            imageBrightState = EFontColor.white;
          }

          // Blob URL 해제
          URL.revokeObjectURL(imgUrl);

          // 디자인 상태 업데이트
          setDesign((prevDesign) => ({
            ...prevDesign,
            ...(location.state.isFront
              ? {
                  backgroundPic: selectImageUrl,
                  backgroundId: selectImageId,
                  fontColor: imageBrightState,
                }
              : {
                  thumbnailPic: selectImageUrl,
                  thumbnailId: selectImageId,
                }),
          }));
          nav.push("../design");
        };
      } catch (error) {
        console.error("이미지 처리 중 오류 발생:", error);
      }
    }
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
      toast.error("업로드에 실패했습니다. 다시 시도해 보세요.");
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
