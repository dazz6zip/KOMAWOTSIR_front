import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";

import { useQuery } from "react-query";
import { FontLoad, IFont } from "../fetcher";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

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
  const location = useLocation() as {
    state: { id?: number; nickname?: string };
  };

  const receiverId = location?.state?.id || null;
  const receiverNickname = location?.state?.nickname || "Unknown";

  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const nav = useHistory();

  const [selectedFont, setSelectedFont] = useState<string | null>(null);

  const { isLoading, data } = useQuery<IFont[]>(["fontLoad", userId], () =>
    FontLoad()
  );

  const handleFontSelect = (fontUrl: string) => {
    setSelectedFont(fontUrl);
  };

  const LoadFont = () => {
    nav.push("../design", {
      selectFont: selectedFont,
    });
  };

  useEffect(() => {
    if (data) {
      // 모든 폰트의 URL을 동적으로 추가
      data.forEach((font) => {
        const link = document.createElement("link");
        link.href = font.url; // 폰트 URL
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
            onClick={() => handleFontSelect(font.name)}
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
