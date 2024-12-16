import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";

import { useQuery } from "react-query";
import { FontLoad, IDesignPost, IFont } from "../fetcher";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ADesignState } from "../atoms";
import { FontCard, FontTitle } from "../StyledComponents";

function FontList() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const nav = useHistory();

  const [selectFont, setSelectFont] = useState<IFont>();

  const { isLoading, data } = useQuery<IFont[]>(["fontLoad", userId], () =>
    FontLoad()
  );

  const handleFontSelect = (
    fontId: number,
    fontName: string,
    fontUrl: string
  ) => {
    setSelectFont({
      id: fontId,
      name: fontName,
      url: fontUrl,
    });
  };

  const [design, setDesign] = useRecoilState(ADesignState);

  const LoadFont = () => {
    setDesign({
      ...design,
      fontId: selectFont?.id,
      fontName: selectFont?.name,
      fontUrl: selectFont?.url,
    });
    nav.push("../design");
  };

  useEffect(() => {
    if (data) {
      data.forEach((font) => {
        const link = document.createElement("link");
        link.href = font.url;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      });
    }
  }, [data]);

  return (
    <>
      <Title>글꼴 목록</Title>
      {data?.map((font) => (
        <FontCard key={font.id}>
          <input
            type="radio"
            name="font"
            value={font.id}
            onClick={() => handleFontSelect(font.id, font.name, font.url)}
          />
          <div>
            <FontTitle fName={font.name || "inherit"}>{font.name}</FontTitle>
          </div>
        </FontCard>
      ))}
      <ButtonL category="pink" onClick={() => LoadFont()}>
        선택한 글꼴 적용
      </ButtonL>
    </>
  );
}

export default FontList;
