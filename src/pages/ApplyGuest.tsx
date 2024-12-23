// 비회원 신청: 전화번호로 회원 & receiver 등록 여부 체크
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { ASenderState } from "../atoms";
import ButtonL from "../components/common/ButtonL";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import DescriptionS from "../components/common/DescriptionS";
import Form from "../components/common/Form";
import { ModalContent, ModalStyle } from "../components/common/ModalStyle";
import Title from "../components/common/Title";
import TitleS from "../components/common/TitleS";
import {
  IQuestionItem,
  IReceiverQuestionToAdd,
  IReceiverSet,
  IReceiverToAdd,
} from "../fetcher";

function ApplyGuest() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const closeContinueModal = () => setIsContinueModalOpen(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [sender, setSender] = useRecoilState(ASenderState);
  const [questions, setQuestions] = useState<IQuestionItem[]>();

  const checkUser = async () => {
    const response = await axios.get<boolean>(
      `/api/users/${sender.id}/receivers/check/tel`,
      {
        params: {
          tel: getValues("tel"),
        },
      }
    );
    if (response.data) {
      history.push(`/already`);
    } else {
      setIsContinueModalOpen(true);
    }
  };

  const continueApply = () => {
    closeContinueModal();
    getInquiry();
  };

  const getInquiry = async () => {
    try {
      const response = await axios.get<IQuestionItem[]>(
        `/api/inquiry/${sender.id}` // 질문목록 불러오기
      );
      if (response.data.length > 0) {
        setQuestions(response.data);
      }
      setCanContinue(true);
    } catch (error) {
      console.error("질문 목록 불러오기 실패:", error);
    }
  };

  const onValid = () => {
    const formData = getValues(); // 모든 폼 데이터 가져오기

    const receiver: IReceiverToAdd = {
      senderId: sender.id,
      tel: formData.tel,
      nickname: formData.nickname,
      memo: formData.info,
    };

    const receiverQuestions: IReceiverQuestionToAdd[] = (questions || []).map(
      (q) => ({
        inquiryItemId: q.id ?? 0, // id가 없을 경우 기본값 0
        receiverId: userId,
        answer: formData[`question_${q.id}`] ?? "", // 입력값 없으면 빈 문자열
      })
    );

    const receiverAdder: IReceiverSet = {
      receiver: receiver,
      answers: receiverQuestions,
    };
    addReceiverSet(receiverAdder);
  };

  const addReceiverSet = async (receiverAdder: IReceiverSet) => {
    try {
      const response = await axios.post(
        `/api/users/${sender.id}/receivers`,
        receiverAdder
      );
      history.push("/apply/done");
    } catch (error) {
      toast.error("신청에 실패했습니다. 다시 시도해 주세요.");
      console.error("신청 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Title>
        {sender.name}님에게
        <br /> 연하장 신청하기
      </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="tel">전화번호</label>
        {errors.tel && <p style={{ color: "red" }}>{errors.tel.message}</p>}
        <input
          {...register("tel", {
            required: "전화번호를 입력해 주세요.",
            pattern: {
              value: /^\d{11}$/,
              message: "전화번호는 숫자 11자리로 입력해 주세요.",
            },
          })}
        />
        <DescriptionS>
          {sender.name}님에게 이미 신청하셨는지 확인할게요!
        </DescriptionS>
        <ButtonS category="hotpink" type="button" onClick={checkUser}>
          등록 확인
        </ButtonS>
        {canContinue && (
          <>
            <br />
            <br />
            <br />
            <label htmlFor="nickname">닉네임</label>
            <DescriptionS>
              {sender.name}님이 알아볼 수 있는 이름으로 입력해 주세요.
            </DescriptionS>
            {errors.nickname && (
              <p style={{ color: "red" }}>{errors.nickname.message}</p>
            )}
            <input
              {...register("nickname", { required: "닉네임을 입력해 주세요." })}
            />

            <label htmlFor="info">소속 / 기타</label>
            <DescriptionS>
              확실한 구분을 위한 정보를 입력해 주세요.
            </DescriptionS>
            {errors.info && (
              <p style={{ color: "red" }}>{errors.info.message}</p>
            )}
            <input
              {...register("info", { required: "소속 정보를 입력해 주세요." })}
            />

            <TitleS>질문 목록</TitleS>
            {questions?.map((q) => (
              <div key={q.id}>
                <h2>{q.question}</h2>
                <DescriptionS>{q.description}</DescriptionS>
                <input
                  {...register(`question_${q.id}`, {
                    required: "답변을 입력해 주세요.",
                  })}
                />
              </div>
            ))}

            <ButtonL category="pink" type="submit">
              신청하기
            </ButtonL>
          </>
        )}
      </Form>

      <Modal
        isOpen={isContinueModalOpen}
        onRequestClose={closeContinueModal}
        style={ModalStyle}
      >
        <ModalContent>
          <h3>신청 가능!</h3>
          <p>
            연하장 알림을 받으실 <br />
            전화번호 ({getValues("tel")})를
            <br /> 다시 한 번 확인해주세요.
          </p>
          <ButtonRow>
            <ButtonS category="gray" onClick={closeContinueModal}>
              전화번호 다시 입력하기
            </ButtonS>
            <ButtonS category="pink" onClick={continueApply}>
              제 전화번호 맞아요
            </ButtonS>
          </ButtonRow>
          &emsp;
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApplyGuest;
