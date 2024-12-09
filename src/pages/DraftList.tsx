import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";

import { useQuery } from "react-query";
import { DraftLoad, IDraftLoad } from "../fetcher";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Description from "../components/common/Description";
import {
  DraftCard,
  DraftContents,
  DraftNullInfo,
  DraftTitle,
} from "../StyledComponents";

function DraftList() {
  const location = useLocation() as {
    state: { id?: number; nickname?: string };
  };

  const receiverId = location?.state?.id || null;
  const receiverNickname = location?.state?.nickname || "Unknown";

  const userId = parseInt(sessionStorage.getItem("userId") || "0");

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

      {(data?.length as number) > 0 ? (
        <>
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
        </>
      ) : (
        <DraftNullInfo>
          <Description>등록된 초안이 없습니다.</Description>
        </DraftNullInfo>
      )}

      <ButtonL category="pink" onClick={() => LoadDraft()}>
        선택 초안 불러오기
      </ButtonL>
    </>
  );
}

export default DraftList;
