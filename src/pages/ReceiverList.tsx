import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import Description from "../components/common/Description";
import Title from "../components/common/Title";
import {
  IReceiver,
  IReceiverQuestion,
  PostList,
  PostStatusMap,
  ReceiverInquiryList,
} from "../fetcher";
import {
  CardBody,
  CardContainer,
  CardHeader,
  CheckForm,
  ContentsBox,
  customStyles,
  Dropdown,
  HeaderItem,
  LoadingImage,
  LoadingWrapper,
  MemoArea,
  ModalContent,
  ReceiverLabel,
  ReceiverListArea,
  StarIcon,
  StateCheckBox,
  StyledCheckbox,
  WriteButton,
} from "../StyledComponents";

function ReceiverList() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(
    null
  );
  const [memoEdits, setMemoEdits] = useState<{ [key: number]: boolean }>({});
  const [memoContent, setMemoContent] = useState<{ [key: number]: string }>({});

  const queryClient = useQueryClient();
  const [statusState, setStatusState] = useState({});

  const {
    data: rlData,
    isFetchingNextPage,
    hasNextPage,
    isLoading: InfiniteLoading,
    fetchNextPage,
  } = useInfiniteQuery<{ content: IReceiver[]; last: boolean }, Error>(
    ["receiver", userId, statusState],
    ({ pageParam = 0 }) => PostList(userId, checkboxValues, pageParam, 6), // pageParam으로 페이지 번호 전달
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.last) {
          return allPages.length;
        }
        return undefined;
      },
    }
  );

  const { data: questionData, isLoading: questionLoading } = useQuery<
    IReceiverQuestion[]
  >(
    ["receiverQuestion", selectedReceiverId],
    () =>
      selectedReceiverId
        ? ReceiverInquiryList(userId, selectedReceiverId)
        : Promise.resolve([]),
    {
      enabled: isOpen && selectedReceiverId !== null,
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

  const {
    control: checkControl,
    handleSubmit: checkHandleSubmit,
    watch: checkWatch,
  } = useForm({
    defaultValues: {
      checkboxes: [true, true, true], // 초기값 설정
    },
  });

  const onSubmit = (data: { checkboxes: boolean[] }) => {};

  const handleCheckboxChange = checkHandleSubmit((data) => {
    // console.log("폼 데이터:", data);
    setStatusState(checkboxValues);
  });

  const checkboxValues = checkWatch("checkboxes");

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

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

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
      {(InfiniteLoading || questionLoading) && (
        <LoadingWrapper>
          <LoadingImage
            src="https://first-s3-of-aendyear.s3.ap-northeast-2.amazonaws.com/etc/loading.gif"
            alt="Loading"
          />
        </LoadingWrapper>
      )}
      {rlData ? (
        <>
          <CheckForm>
            <form onSubmit={checkHandleSubmit(onSubmit)}>
              <StateCheckBox>
                {["작성전", "작성중", "작성완료"].map((label, index) => (
                  <Controller
                    key={index}
                    name={`checkboxes.${index}`}
                    control={checkControl}
                    render={({ field }) => (
                      <ReceiverLabel>
                        <StyledCheckbox
                          type="checkbox"
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            handleCheckboxChange();
                          }}
                          checked={field.value}
                        />
                        {label}
                      </ReceiverLabel>
                    )}
                  />
                ))}
              </StateCheckBox>
            </form>
          </CheckForm>

          {rlData?.pages
            .flatMap((page) => page.content)
            .map((sdata) => (
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
                        {sdata?.postContents?.length > 35
                          ? sdata.postContents.slice(0, 34) + "..."
                          : sdata.postContents}
                        <WriteButton>+ 편집하기</WriteButton>
                      </ContentsBox>
                    )}
                  </Link>

                  <div>
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
                          <i onClick={() => handleMemoEditToggle(sdata.id)}>
                            수정
                          </i>
                        </div>
                      )}
                    </MemoArea>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
        </>
      ) : (
        <ReceiverListArea>
          <Description>아직 신청이 오지 않았어요.</Description>
        </ReceiverListArea>
      )}

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
