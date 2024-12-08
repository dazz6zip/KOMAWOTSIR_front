import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";

import { useQuery } from "react-query";
import { FontLoad, IDesignPost, IFont } from "../fetcher";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ADesignState } from "../atoms";

const FontCard = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 10px auto;
  padding: 15px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
  }

  input {
    margin-right: 15px;
  }
`;

const FontTitle = styled.div<{ fName: string }>`
  font-family: ${(props) => props.fName};
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 3px;
`;

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
