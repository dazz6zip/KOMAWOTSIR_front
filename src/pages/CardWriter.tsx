import styled from "styled-components";
import imsi1 from "../images/imsi1.png";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import DescriptionS from "../components/common/DescriptionS";
import Img from "../components/common/Img";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import {
  IPostContentsLoad,
  PostContentsCheck,
  PostContentsLoad,
} from "../fetcher";

const TextAreaContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 300px;
  height: 100px;
  padding: 10px;
  font-size: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const PreviewArea = styled.div<{ bimage?: string }>`
  /* background-image: url(${(props) => props.bimage});
   */
  background-color: tomato;
  width: 300px;
  min-height: 160px;
  display: block;
  text-align: center;
  align-items: center;
  padding: 30px;
`;

function CardWriter() {
  const userId = 5;

  const location = useLocation() as {
    state: { id: number; nickname: string };
  };

  const receiverId = location.state.id;
  const receiverNickname = location.state.nickname;

  const [postId, setPostId] = useState<number>(0);

  const [contents, setContents] = useState<string>("Happy new year!");

  const inputContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.currentTarget.value);
  };

  // preContents;
  const { isLoading: checkLoading, data: checkData } = useQuery<number>(
    ["postCheck", userId],
    () => PostContentsCheck(userId, receiverId),
    {
      onSuccess: (data) => {
        if (data !== null && data > 0) {
          setPostId(data);
        }
      },
    }
  );

  const { isLoading: contentsLoading, data: contentsData } =
    useQuery<IPostContentsLoad>(
      ["postContents", postId],
      () => PostContentsLoad(postId),
      {
        enabled: postId > 0,
        onSuccess: (data) => {
          setContents(data.contents);
        },
      }
    );

  const savePost = (value: string) => {
    let state = "";
    if (value === "pre") {
      state = "progressing";
    } else if (value === "final") {
      state = "completed";
    }

    axios
      .post(`/api/posts/${state}`, {
        id: contentsData?.id,
        senderId: contentsData?.senderId,
        senderNickname: contentsData?.senderNickname,
        receiverId: contentsData?.receiverId,
        contents: contents,
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Title>
        {receiverNickname} 님에게
        <br />
        연하장 작성하기
      </Title>
      <PreviewArea>
        <span>{contents}</span>
      </PreviewArea>
      <ButtonRow>
        <ButtonS category="gray">초안 불러오기</ButtonS>
        <ButtonS category="gray">초안 등록하기</ButtonS>
        <ButtonS category="blue">ChatGPT로 작성하기</ButtonS>
      </ButtonRow>
      <TextAreaContainer>
        <TextArea onChange={inputContents} value={contents} maxLength={300} />
      </TextAreaContainer>
      <ButtonRow>
        <ButtonL onClick={() => savePost("pre")} category="hotpink">
          임시저장
        </ButtonL>
        <ButtonL onClick={() => savePost("final")} category="pink">
          저장하기
        </ButtonL>
      </ButtonRow>
      <DescriptionS>
        연하장이 공개되는 1월 1일 전까지는 <br />
        저장한 후에도 얼마든지 수정할 수 있어요.
      </DescriptionS>
    </>
  );
}

export default CardWriter;
