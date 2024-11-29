import styled from "styled-components";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Description from "../components/common/Description";
import ButtonRow from "../components/common/ButtonRow";
import Img from "../components/common/Img";
import { PreviewArea } from "./CardWriter";
import { useQuery } from "react-query";
import { DesignPostLoad, fontColor, IDesignPost } from "../fetcher";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

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

const FontPreview = styled.p<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily};
  font-size: 20px;
`;

function CardDesigner() {
  const userId = 5;

  const nav = useHistory();

  const [fontSize, setFontSize] = useState<number>();
  const [background, setBackground] = useState<string>();
  const [thumbnail, setThumbnail] = useState<string>();
  const [fontName, setFontName] = useState<string>();
  // const [fontColor, setFontColor] = useState<fontColor>(FontColor);

  const location = useLocation() as {
    state: { selectFont?: string };
  };

  const { isLoading, data } = useQuery<IDesignPost>(
    ["designPost", userId],
    () => DesignPostLoad(userId),
    {
      enabled: location.state == null,
      onSuccess: (data) => {
        setBackground(data.backgroundPic);
        setThumbnail(data.thumbnailPic);
        setFontName(data.fontName);
        // setFontColor(data.fontColor);
        // setFontSize(data.fontSize);
      },
    }
  );

  useEffect(() => {
    if (location.state) {
      setFontName(location.state.selectFont);
    }
  }, []);

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
  }, [data?.fontUrl]);

  const editFontSize = (option: string) => {
    if (option === "default") {
      setFontSize(16);
    } else if (option === "big") {
      setFontSize(24);
    }
  };

  const SaveDesign = () => {
    console.log("");
    // // 배경화면
    // axios.put(
    //   `/api/users/${userId}/designs/${data?.designId}/${true}/${imageId}`
    // );
    // // 썸네일
    // axios.put(
    //   `/api/users/${userId}/designs/${data?.designId}/${false}/${imageId}`
    // );
    // // 폰트
    // axios.put(
    //   `/api/users/${userId}/designs/font/${fontId}/${fontSize}/${fontColor}`
    // );
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
        bimage={`/image/${data?.backgroundPic}`}
        fFamily={fontName}
        fsize={fontSize}
      >
        <span>와아아아</span>
      </PreviewArea>

      <Options>
        <div>
          <label>배경화면</label>
          <ButtonS category="whitehotpink">변경하기</ButtonS>
          <Img src={`/image/${background}`} width="20%" />
        </div>

        <div>
          <label>썸네일</label>
          <ButtonS category="whitehotpink">변경하기</ButtonS>
          <Img src={`/image/${thumbnail}`} width="20%" />
        </div>

        <div>
          <label>글꼴</label>
          <ButtonS
            category="whitehotpink"
            onClick={() => nav.push(`/font-list`)}
          >
            변경하기
          </ButtonS>
          <FontPreview fontFamily={fontName || "inherit"}>
            {fontName}
          </FontPreview>
        </div>

        <div>
          <label>글꼴 크기</label>
          <button onClick={() => editFontSize("default")}>보통</button>
          <button onClick={() => editFontSize("big")}>크게</button>
        </div>

        <div>
          <label>글씨 색상</label>
          <button onClick={() => editFontSize("default")}>흰색</button>
          <button onClick={() => editFontSize("big")}>검은색</button>
        </div>
      </Options>

      <ButtonL category="pink" onClick={() => SaveDesign()}>
        저장하기
      </ButtonL>
    </>
  );
}

export default CardDesigner;
