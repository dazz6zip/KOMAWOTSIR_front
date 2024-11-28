import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Description from "../components/common/Description";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { createQuestion, IQuestionItem, IUserInfoType } from "../fetcher";
import axios from "axios";
import { customStyles, ModalContent } from "./UpdateMyInfo";

const QuestionBox = styled.div`
  padding-top: 3px;
  margin-top: 10px;
`;

const QuestionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
  color: #f28b8b;
  margin-bottom: 5px;
  display: block;
`;

const QuestionForm = styled.form`
  text-align: center;

  button {
    margin-bottom: 2px;
  }
`;

const Input = styled.input<{ isError?: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.isError ? "#ED798D" : "#ddd")};
  border-radius: 5px;
  margin-bottom: 5px;
`;

const NicknameInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
`;

function FormMaker() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const [initialData, setInitialData] = useState<IQuestionItem[]>([]);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [nickname, setNickname] = useState("");

  // 페이지가 로딩되면 이미 설문 데이터가 생성되어 있는지 확인하기
  // 생성되어 있을 경우 -> 바로 질문 목록 띄움
  // 생성되지 않았을 경우 -> 닉네임 설정 모달
  useEffect(() => {
    axios
      .get<boolean>(`/api/inquiry/${userId}/nickname/check`)
      .then((inquiryRes) => {
        if (!inquiryRes.data) {
          setIsNicknameModalOpen(true);
          axios
            .get<IUserInfoType>(`/api/users/${userId}`)
            .then((res) => {
              setNickname(res.data.name);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
  }, [userId]);

  // input 태그로 입력값 관리할 것 useForm 사용
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      questions: [{ question: "", description: "" }],
    },
  });

  // useFieldArray는 useForm에서 지원하는 hook
  // 동적으로 추가 / 삭제하기 위해 사용함 (설문에 대해 동적으로 처리하려고...)
  // fields : 렌더링 중인 배열 상태
  // append : 배열의 끝에 새로운 배열 추가
  // remove : 특정 필드 삭제
  const { fields, append, remove } = useFieldArray({
    control, // useForm의 control을 전달하는 것
    name: "questions",
  });

  // 닉네임 저장 처리
  const saveNickname = async () => {
    try {
      await axios.post(`/api/inquiry/${userId}/${nickname}`);
      setIsNicknameModalOpen(false);
    } catch (error) {
      console.error("닉네임 저장 실패:", error);
    }
  };

  // form이 submit 되었을 때
  // 기존 데이터와 비교하여 수정 / 추가 / 삭제 구분
  // 구분에 맞춰 처리함
  const onSubmit = (formData: { questions: IQuestionItem[] }) => {
    const currentQuestions = formData.questions;

    // 수정된 항목
    const modifiedQuestions = currentQuestions.filter((current) => {
      // id가 있고, 내용이 달라졌을 경우
      const original = initialData.find((item) => item.id === current.id);
      return (
        original &&
        (original.question !== current.question ||
          original.description !== current.description)
      );
    });

    // 추가된 항목
    // id 없는 경우
    const addedQuestions = currentQuestions.filter((current) => !current.id);

    // 삭제된 항목
    // 기존에는 있는 id가 없어진 경우
    const deletedQuestions = initialData.filter(
      (original) =>
        !currentQuestions.some((current) => current.id === original.id)
    );

    try {
      if (modifiedQuestions.length > 0) {
        modifiedQuestions.map((question) =>
          axios.put(`/api/inquiry/${userId}`, question)
        );
      }

      if (addedQuestions.length > 0) {
        addedQuestions.map((question) =>
          axios.post(`/api/inquiry/${userId}`, question)
        );
      }

      if (deletedQuestions.length > 0) {
        deletedQuestions.map((question) =>
          axios.delete(`/api/inquiry/${userId}/${question.id}`)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { isLoading, error } = useQuery<IQuestionItem[]>(
    ["question", userId],
    () => createQuestion(userId),
    {
      // data를 가져오는 데 성공하면 아래 함수 실행
      onSuccess: (data) => {
        if (data.length === 0) {
          // 질문이 하나도 없을 경우 기본 틀 input 세트 하나 제공
          setValue("questions", [
            {
              question: "",
              description: "",
            },
          ]);
        } else {
          setInitialData(data);
          // 수정 / 추가 / 삭제 구분하기 위해 useState에도 저장해 두기
          setValue(
            "questions",
            data.map((item) => ({
              id: item.id,
              inquiryId: item.inquiryId,
              question: item.question,
              description: item.description,
            }))
          );
        }
      },
    }
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {String(error)}</div>;

  return (
    <>
      <Title>연하장 신청받기</Title>
      <Description>
        기본적으로 수신인의 닉네임과 전화번호를 수집해요.
        <br />
        추가적으로 수집할 정보가 있다면,
        <br />
        질문을 추가해서 답변을 받을 수 있어요.
        <br />
      </Description>

      <Modal
        isOpen={isNicknameModalOpen}
        onRequestClose={() => setIsNicknameModalOpen(false)}
        ariaHideApp={false}
        style={customStyles}
      >
        <ModalContent>
          <h3>닉네임 설정하기</h3>
          <p>
            신청받을 닉네임을 설정해 주세요. <br />
            <br />
            한 번 설정한 닉네임은 <br />한 해 동안 변경할 수 없습니다.
          </p>
          <NicknameInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <ButtonL category="pink" onClick={saveNickname}>
            저장하기
          </ButtonL>
        </ModalContent>
      </Modal>

      <QuestionForm onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <QuestionBox key={field.id}>
            <QuestionRow>
              <Label>{index + 1}번 질문</Label>
              <ButtonS category="white" onClick={() => remove(index)}>
                삭제
              </ButtonS>
            </QuestionRow>

            <InputGroup>
              <Input
                type="text"
                placeholder="추가하고 싶은 질문을 입력해 주세요."
                isError={!!errors.questions?.[index]?.question}
                {...register(`questions.${index}.question`, {
                  required: "질문을 입력해 주세요.",
                })}
              />

              <Input
                type="text"
                placeholder="질문에 대한 설명을 추가해 주세요."
                {...register(`questions.${index}.description`)}
              />
            </InputGroup>
          </QuestionBox>
        ))}

        <ButtonS
          category="pink"
          type="button"
          onClick={() => append({ question: "", description: "" })}
        >
          + 질문 추가하기
        </ButtonS>
        <ButtonL category="pink" type="submit">
          저장하기
        </ButtonL>
        <ButtonL category="hotpink">링크 공유하기</ButtonL>
      </QuestionForm>
    </>
  );
}

export default FormMaker;
