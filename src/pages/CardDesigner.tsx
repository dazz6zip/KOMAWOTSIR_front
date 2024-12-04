import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Description from "../components/common/Description";
import axios from "axios";
import Img from "../components/common/Img";
import { PreviewArea } from "./CardWriter";
import { useQuery } from "react-query";
import { DesignPostLoad, EFontColor, EFontSize, IDesignPost } from "../fetcher";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ADesignLoadState, ADesignState } from "../atoms";

const Options = styled.div`
  width: 100%;
  margin-left: 25px;
  div {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 3px;
    align-items: center;

    margin: 10px 0;

    img {
      width: 80px;
    }

    button {
      width: 80px;
    }
  }

  .option-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 14px;
      color: #333;
    }
  }
`;

const SizeButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#EEB0B2" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  border: ${(props) =>
    props.isSelected ? "2px solid #ED798D" : "1px solid #ccc"};
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#EEB0B2" : "#f5f5f5")};
    color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  }
`;

const ColorButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? (props.children === "흰색" ? "#000" : "#fff") : "#fff"};
  color: ${(props) =>
    props.isSelected ? (props.children === "흰색" ? "#fff" : "#000") : "#000"};
  border: ${(props) =>
    props.isSelected ? "2px solid #ED798D" : "1px solid #ccc"};
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.children === "흰색" ? "#333" : "#e0e0e0"};
    color: ${(props) => (props.children === "흰색" ? "#fff" : "#000")};
  }
`;

const FontPreview = styled.p<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily};
  font-size: 20px;
`;

function CardDesigner() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const [design, setDesign] = useRecoilState(ADesignState);
  const [designLoad, setDesignLoad] = useRecoilState(ADesignLoadState);

  const nav = useHistory();

  const { isLoading, data } = useQuery<IDesignPost>(
    ["designPost", userId],
    () => DesignPostLoad(userId),
    {
      enabled: designLoad,
      onSuccess: (data) => {
        setDesign({
          designId: data.designId,
          thumbnailPic: data.thumbnailPic,
          thumbnailId: data.thumbnailId,
          backgroundPic: data.backgroundPic,
          backgroundId: data.backgroundId,
          fontId: data.fontId,
          fontSize: data.fontSize,
          fontColor: data.fontColor,
          fontUrl: data.fontUrl,
          fontName: data.fontName,
        });
        setDesignLoad(false);
      },
    }
  );

  useEffect(() => {
    if (data?.fontUrl) {
      const link = document.createElement("link");
      link.href = data.fontUrl;
      link.rel = "stylesheet";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [[design.fontUrl]]);

  const editFontSize = (option: string) => {
    setDesign({
      ...design,
      fontSize:
        option === "default" ? EFontSize.defaultSize : EFontSize.bigSize,
    });
  };

  const editFontColor = (option: string) => {
    setDesign({
      ...design,
      fontColor: option === "white" ? EFontColor.white : EFontColor.black,
    });
  };

  const SaveDesign = () => {
    console.log(design);

    // 배경화면
    axios
      .put(
        `/api/users/${userId}/designs/${design.designId}/${true}/${
          design.backgroundId
        }`
      )
      .then(() => {
        // 썸네일
        axios.put(
          `/api/users/${userId}/designs/${design.designId}/${false}/${
            design.thumbnailId
          }`
        );
      })
      .then(() => {
        // 폰트
        axios.put(
          `/api/users/${userId}/designs/font/${design.fontId}/${design.fontSize}/${design.fontColor}`
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Title>연하장 디자인하기</Title>
      <Description>
        신년 연하장의 디자인을 설정할 수 있어요.
        <br />
        2025년 작성하는 모든 연하장에
        <br />
        공통으로 적용됩니다.
      </Description>

      <PreviewArea
        bimage={design.backgroundPic}
        fFamily={design.fontName}
        fsize={design.fontSize === EFontSize.defaultSize ? 16 : 24}
        fColor={design.fontColor === EFontColor.white ? "white" : "black"}
      >
        <span>
          고마워써로 신년 인사를 전해 보세요!
          <br />이 공간에 연하장을 작성할 수 있어요.
        </span>
      </PreviewArea>

      <Options>
        <div>
          <label>배경화면</label>
          <ButtonS
            category="whitehotpink"
            onClick={() => nav.push(`../background`, { isFront: true })}
          >
            변경하기
          </ButtonS>
          <Img src={`${design.backgroundPic}`} width="20%" />
        </div>

        <div>
          <label>썸네일</label>
          <ButtonS
            category="whitehotpink"
            onClick={() => nav.push(`../background`, { isFront: false })}
          >
            변경하기
          </ButtonS>
          <Img src={`${design.thumbnailPic}`} width="20%" />
        </div>

        <div>
          <label>글꼴</label>
          <ButtonS
            category="whitehotpink"
            onClick={() => nav.push(`/font-list`)}
          >
            변경하기
          </ButtonS>
          <FontPreview fontFamily={design.fontName || "inherit"}>
            {design.fontName}
          </FontPreview>
        </div>

        <div>
          <label>글꼴 크기</label>
          <SizeButton
            isSelected={design.fontSize === EFontSize.defaultSize}
            onClick={() => editFontSize("default")}
          >
            보통
          </SizeButton>
          <SizeButton
            isSelected={design.fontSize === EFontSize.bigSize}
            onClick={() => editFontSize("big")}
          >
            크게
          </SizeButton>
        </div>

        <div>
          <label>글씨 색상</label>
          <ColorButton
            isSelected={design.fontColor === EFontColor.white}
            onClick={() => editFontColor("white")}
          >
            흰색
          </ColorButton>
          <ColorButton
            isSelected={design.fontColor === EFontColor.black}
            onClick={() => editFontColor("black")}
          >
            검은색
          </ColorButton>
        </div>
      </Options>

      <ButtonL category="pink" onClick={() => SaveDesign()}>
        저장하기
      </ButtonL>
    </>
  );
}

export default CardDesigner;
