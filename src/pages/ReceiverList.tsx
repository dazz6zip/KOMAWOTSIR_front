import styled from "styled-components";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import Title from "../components/common/Title";
import { customStyles, ModalContent } from "./UpdateMyInfo";
import { useState } from "react";
import Description from "../components/common/Description";
import { useQuery } from "react-query";
import Modal from "react-modal";
import {
  IReceiverList,
  IReceiverQuestionList,
  PostList,
  PostStatus,
  PostStatusMap,
  ReceiverInquiryList,
} from "../fetcher";

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

  span {
    display: block;
    margin-top: 5px;
    color: #555;
  }
`;

const ContentsBox = styled.div`
  text-align: center;
  padding-bottom: 10px;
`;

function ReceiverList() {
  const userId = 5;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(
    null
  );

  const { isLoading: rlIsLoading, data: rlData } = useQuery<IReceiverList[]>(
    ["receiver", userId],
    () => PostList(userId)
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

  return (
    <>
      <Title>
        2025 연하장
        <br />
        신청 목록
      </Title>
      <Description>작성 중인 연하장은 신년에 전달되지 않아요.</Description>

      <ButtonRow>
        <ButtonS category="hotpink">+ 수신인 추가하기</ButtonS>
        <ButtonS category="pink">디자인 수정하기</ButtonS>
      </ButtonRow>
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
            {sdata.postStatus === "PENDING" ? (
              <WriteButton>+ 연하장 작성하기</WriteButton>
            ) : (
              <ContentsBox>
                {sdata.postContents.length > 50
                  ? sdata.postContents.slice(0, 50) + "..."
                  : sdata.postContents}
              </ContentsBox>
            )}

            <MemoArea>
              <div>메모</div>
              <span>{sdata.memo}</span>
            </MemoArea>
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
          <button onClick={() => setIsOpen(false)}>닫기</button>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReceiverList;
