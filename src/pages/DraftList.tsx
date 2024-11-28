import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import { useQuery } from "react-query";
import { DraftLoad, IDraftLoad } from "../fetcher";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const DraftCard = styled.div`
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

const DraftTitle = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 3px;
`;

const DraftContents = styled.div`
  color: #777;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 3px;
`;

function DraftList() {
  const location = useLocation() as {
    state: { id?: number; nickname?: string };
  };

  const receiverId = location?.state?.id || null;
  const receiverNickname = location?.state?.nickname || "Unknown";

  const userId = 5;

  const nav = useHistory();

  const [selectDraftContent, setSelectDraftContent] = useState<string>();

  const { isLoading, data } = useQuery<IDraftLoad[]>(
    ["draftLoad", userId],
    () => DraftLoad(userId)
  );

  const handleDraftSelect = (contents: string) => {
    setSelectDraftContent(contents);
  };

  const LoadDraft = () => {
    nav.push("../write", {
      id: receiverId,
      nickname: receiverNickname,
      selectDraftContent: selectDraftContent,
    });
  };

  return (
    <>
      <Title>초안 목록</Title>
      {data?.map((d) => (
        <DraftCard key={d.id}>
          <input
            type="radio"
            name="draft"
            value={d.id}
            onClick={() => handleDraftSelect(d.contents)}
          />
          <div>
            <DraftTitle>{d.title}</DraftTitle>
            <DraftContents>
              {d.contents.length > 25
                ? d.contents.slice(0, 24) + "..."
                : d.contents}
            </DraftContents>
          </div>
        </DraftCard>
      ))}
      <ButtonL category="pink" onClick={() => LoadDraft()}>
        선택 초안 불러오기
      </ButtonL>
    </>
  );
}

export default DraftList;
