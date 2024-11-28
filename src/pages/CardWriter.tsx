import styled from "styled-components";
import imsi1 from "../images/imsi1.png";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import DescriptionS from "../components/common/DescriptionS";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Modal from "react-modal";
import axios from "axios";
import {
  GptLoad,
  IDraftLoad,
  IPostContentsLoad,
  PostContentsCheck,
  PostContentsLoad,
} from "../fetcher";
import { customStyles, ModalContent } from "./UpdateMyInfo";

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
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const [postId, setPostId] = useState<number>(0);
  const [saveTitle, setSaveTitle] = useState<boolean>(false);
  const [finalTitle, setFinalTitle] = useState<string>("초안");
  const [contents, setContents] = useState<string>("Happy new year!");
  const [saveResult, setSaveResult] = useState<boolean>(false);
  const [gptLoad, setGptLoad] = useState<boolean>(false);
  const [gptPrompt, setGptPrompt] = useState<string>("");
  const [gptModal, setGptModal] = useState<boolean>(false);

  const location = useLocation() as {
    state: { id?: number; nickname?: string; selectDraftContent?: string };
  };

  const receiverId = location?.state?.id || null;
  const receiverNickname = location?.state?.nickname || "Unknown";
  const selectDraftContent = location?.state?.selectDraftContent || "";

  const nav = useHistory();

  useEffect(() => {
    if (receiverId === null) {
      nav.push("../receiver-list", { receiverId: receiverId });
    }
  }, [receiverId, nav]);

  useEffect(() => {
    if (selectDraftContent) {
      setContents(selectDraftContent);
    }
  }, [selectDraftContent]);

  const inputContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.currentTarget.value);
  };

  const { isLoading: checkLoading, data: checkData } = useQuery<number>(
    ["postCheck", userId],
    () => PostContentsCheck(userId, receiverId as number),
    {
      enabled: receiverId !== null,
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
        enabled: postId > 0 && selectDraftContent == "",
        onSuccess: (data) => {
          setContents(data.contents);
        },
      }
    );

  const [gptRequestKey, setGptRequestKey] = useState<number>(0);

  const { isLoading: gptLoading, data: gptData } = useQuery<String>(
    ["gptLoad", userId, gptRequestKey],
    () => GptLoad(gptPrompt),
    {
      enabled: gptRequestKey > 0,
      onSuccess: (data) => {
        setContents(data.toString());
        setGptModal(false);
      },
      onError: () => {
        alert("ChatGPT 요청 중 오류가 발생했습니다.");
        setGptModal(false);
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
        senderId: contentsData?.senderId || userId,
        senderNickname: contentsData?.senderNickname,
        receiverId: contentsData?.receiverId || receiverId,
        contents: contents,
      })
      .then(() => {
        setSaveResult(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const AddDraft = () => {
    axios
      .post<IDraftLoad>(`/api/users/${userId}/drafts`, {
        userId: userId,
        title: finalTitle,
        contents: contents,
      })
      .then((res) => {
        setFinalTitle("");
        setSaveTitle(false);
      })
      .catch((err) => console.error(err));
  };

  const RequestGPT = () => {
    setGptLoad(true);
    setGptRequestKey((prev) => prev + 1);
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
        <ButtonS
          category="gray"
          onClick={() =>
            nav.push("/draft", {
              id: receiverId,
              nickname: receiverNickname,
            })
          }
        >
          초안 불러오기
        </ButtonS>
        <ButtonS category="gray" onClick={() => setSaveTitle(true)}>
          초안 등록하기
        </ButtonS>
        <ButtonS category="blue" onClick={() => setGptModal(true)}>
          ChatGPT로 작성하기
        </ButtonS>
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
      <Modal
        isOpen={saveResult}
        onRequestClose={() => setSaveResult(false)}
        ariaHideApp={false}
        style={customStyles}
      >
        <ModalContent>
          <h3>응답 내역</h3>
          <p>저장이 완료되었습니다.</p>
          <ButtonS category="pink" onClick={() => nav.push("../receiver-list")}>
            목록으로 돌아가기
          </ButtonS>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={saveTitle}
        onRequestClose={() => setSaveTitle(false)}
        ariaHideApp={false}
        style={customStyles}
      >
        <ModalContent>
          <h3>초안 제목 설정</h3>
          <p>입력한 내용을 초안으로 저장할게요.</p>
          <input
            type="text"
            onChange={(e) => setFinalTitle(e.target.value)}
            placeholder="초안 제목을 입력하세요"
          />
          <ButtonS category="pink" onClick={() => AddDraft()}>
            저장하기
          </ButtonS>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={gptModal}
        onRequestClose={() => setGptModal(false)}
        ariaHideApp={false}
        style={customStyles}
      >
        <ModalContent>
          <h3>ChatGPT 도움 받기</h3>
          {gptLoading ? (
            <p>조금만 기다려 주세요!</p>
          ) : (
            <>
              <p>ChatGPT에게 요청할 내용을 입력해 주세요.</p>
              <input
                type="text"
                onChange={(e) => setGptPrompt(e.target.value)}
                placeholder="못 본 지 오래된 친구에게 쓸 거야"
              />
              <ButtonS category="pink" onClick={() => RequestGPT()}>
                요청하기
              </ButtonS>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardWriter;
