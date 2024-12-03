import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import Description from "../components/common/Description";
import Title from "../components/common/Title";
import {
  IReceiver,
  IReceiverQuestionList,
  PostList,
  PostStatus,
  PostStatusMap,
  ReceiverInquiryList,
} from "../fetcher";
import { customStyles, ModalContent } from "./UpdateMyInfo";

const CardContainer = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #d8e3ed;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 5px;
`;

const CardHeader = styled.div<{ statusForHeader: PostStatus }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => {
    switch (props.statusForHeader) {
      case PostStatus.PROGRESSING:
        return "#87B9CE";
      case PostStatus.COMPLETED:
        return "#EEB0B2";
      default:
        return "#BCCBD2";
    }
  }};
  padding: 10px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #333;
`;

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.span`
  color: #ffffff;
  font-size: 1.2rem;
  margin-right: 10px;
`;

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.7rem;
`;

const CardBody = styled.div`
  background-color: #ffffff;
  padding: 15px;
  font-size: 0.7rem;
  color: #666;
`;

const WriteButton = styled.div`
  text-align: center;
  padding: 5px;
  color: #888;
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;

const MemoArea = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 10px;
  color: #aaa;
  font-size: 0.8rem;
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
    margin-right: 10px;
    color: #555;
  }

  i {
    font-style: italic;
    color: #ed798d;
    margin-left: 5px;
  }

  div {
    display: flex;
    align-items: center;
  }

  input {
    margin-left: 10px;
    width: 200px;
    height: 30px;

    padding: 7px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 10px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 1px rgba(0, 123, 255, 0.5);
    }
  }
`;

const ContentsBox = styled.div`
  text-align: center;
  padding-bottom: 10px;
  color: #3a3b42;
`;

function ReceiverList() {
  // const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const userId = 5;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(
    null
  );
  const [memoEdits, setMemoEdits] = useState<{ [key: number]: boolean }>({});
  const [memoContent, setMemoContent] = useState<{ [key: number]: string }>({});

  const queryClient = useQueryClient();

  const { isLoading: rlIsLoading, data: rlData } = useQuery<IReceiver[]>(
    ["receiver", userId],
    () => PostList(userId),
    {
      onSuccess: (data) => {
        const updatedMemoContent = { ...memoContent };
        data.forEach((d) => {
          updatedMemoContent[d.id] = d.memo;
        });
        setMemoContent(updatedMemoContent);
      },
    }
  );

  const { data: questionData, isLoading: questionLoading } = useQuery<
    IReceiverQuestionList[]
  >(
    ["receiverQuestion", selectedReceiverId],
    () =>
      selectedReceiverId
        ? ReceiverInquiryList(userId, selectedReceiverId)
        : Promise.resolve([]),
    {
      enabled: isOpen && selectedReceiverId !== null, // Modal이 열릴 때만 실행
    }
  );

  const openModal = (receiverId: number) => {
    setSelectedReceiverId(receiverId);
    setIsOpen(true);
  };

  const handleMemoEditToggle = (id: number) => {
    setMemoEdits((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const saveMemo = (receiverId: number) => {
    axios
      .put(`/api/users/${userId}/receivers/${receiverId}`, {
        memo: memoContent[receiverId],
      })
      .then(() => {
        handleMemoEditToggle(receiverId);
        queryClient.invalidateQueries(["receiver", userId]);
        // invalidateQueries : useQuery가 캐시에 저장해 둔 값을 무효화하여 다시 로드하게 함
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "@naver.com",
    },
  });

  return (
    <>
      <Title>
        2025 연하장
        <br />
        신청 목록
      </Title>
      <Description>작성 중인 연하장은 신년에 전달되지 않아요.</Description>

      <ButtonRow>
        <Link to={`/add-receiver`}>
          <ButtonS category="hotpink">+ 수신인 추가하기</ButtonS>
        </Link>
        <Link to={`/design`}>
          <ButtonS category="pink">디자인 수정하기</ButtonS>{" "}
        </Link>
      </ButtonRow>

      <b>체크박스 **별 보기</b>
      {rlData?.map((sdata) => (
        <CardContainer key={sdata.id}>
          <CardHeader statusForHeader={sdata.postStatus}>
            <HeaderItem>
              <StarIcon>✶</StarIcon> {sdata.nickname}
            </HeaderItem>
            <Dropdown onClick={() => openModal(sdata.id)}>
              {isOpen && selectedReceiverId === sdata.id
                ? "응답 닫기"
                : "응답 보기"}
            </Dropdown>
            <div>
              {sdata.postStatus
                ? PostStatusMap[sdata.postStatus]
                : PostStatusMap["PENDING"]}
            </div>
          </CardHeader>

          <CardBody>
            <Link
              to={{
                pathname: "/write",
                state: { id: sdata.id, nickname: sdata.nickname },
              }}
            >
              {sdata.postStatus === "PENDING" ? (
                <WriteButton>+ 연하장 작성하기</WriteButton>
              ) : (
                <ContentsBox>
                  {sdata.postContents.length > 35
                    ? sdata.postContents.slice(0, 34) + "..."
                    : sdata.postContents}
                  <WriteButton>+ 편집하기</WriteButton>
                </ContentsBox>
              )}
            </Link>

            <div key={sdata.id}>
              <MemoArea>
                <div>메모</div>
                {memoEdits[sdata.id] ? (
                  <div>
                    <input
                      value={memoContent[sdata.id] || ""}
                      onChange={(e) =>
                        setMemoContent((prev) => ({
                          ...prev,
                          [sdata.id]: e.target.value,
                        }))
                      }
                    />
                    <i onClick={() => saveMemo(sdata.id)}>저장</i>
                  </div>
                ) : sdata.memo === null ? (
                  <p onClick={() => handleMemoEditToggle(sdata.id)}>
                    <i>여기</i> 를 눌러서 메모를 등록해 보세요.
                  </p>
                ) : (
                  <div>
                    <p onClick={() => handleMemoEditToggle(sdata.id)}>
                      {sdata.memo.length > 25
                        ? sdata.memo.slice(0, 24) + "..."
                        : sdata.memo}{" "}
                    </p>
                    <i onClick={() => handleMemoEditToggle(sdata.id)}>수정</i>
                  </div>
                )}
              </MemoArea>
            </div>
          </CardBody>
        </CardContainer>
      ))}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        style={customStyles}
      >
        <ModalContent>
          <h3>응답 내역</h3>
          {questionLoading ? (
            <p>로딩 중...</p>
          ) : questionData && questionData.length > 0 ? (
            questionData.map((q) => (
              <div key={q.id}>
                <p>
                  질문: {q.question}
                  <br />
                  답변: {q.answer}
                </p>
              </div>
            ))
          ) : (
            <p>응답 데이터가 없습니다.</p>
          )}
          <ButtonS category="pink" onClick={() => setIsOpen(false)}>
            닫기
          </ButtonS>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReceiverList;
