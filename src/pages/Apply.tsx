// 회원이 수신사 신청
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ASenderState } from "../atoms";
import ButtonL from "../components/common/ButtonL";
import DescriptionS from "../components/common/DescriptionS";
import Form from "../components/common/Form";
import Title from "../components/common/Title";
import {
  getQuestion,
  IQuestionItem,
  IReceiverQuestionToAdd,
  IReceiverSet,
  IReceiverToAdd,
} from "../fetcher";

function Apply() {
  const { register, watch, getValues, handleSubmit } = useForm();
  const history = useHistory();

  const receiverId = parseInt(sessionStorage.getItem("userId") || "0");
  const sender = useRecoilValue(ASenderState);
  const [questions, setQuestions] = useState<IQuestionItem[]>();

  const { data } = useQuery<IQuestionItem[]>(["questionLoad", sender.id], () =>
    getQuestion(sender.id)
  );

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
      await axios.post(`/api/users/${sender.id}/receivers`, receiverAdder);
      history.push("/apply/done");
    } catch (error) {
      console.error("신청 중 오류 발생:", error);
      alert("신청 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <>
        <Title>
          {sender.name}님에게
          <br /> 연하장 신청하기
        </Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="nickname">닉네임</label>
          <DescriptionS>
            {sender.name}님이 알아볼 수 있는 이름으로 입력해 주세요.
          </DescriptionS>
          <input {...register("nickname", { required: true })} />

          <label htmlFor="info">소속 / 기타</label>
          <DescriptionS>확실한 구분을 위한 정보를 입력해 주세요</DescriptionS>
          <input {...register("info")} />

          {data?.map((q) => (
            <>
              <div key={q.id}>
                <label>{q.question}</label>
                <DescriptionS>{q.description}</DescriptionS>
                <input {...register(`question_${q.id}`, { required: true })} />
              </div>
            </>
          ))}
        </Form>
        <ButtonL category="pink" type="submit">
          신청하기
        </ButtonL>
      </>
    </>
  );
}

export default Apply;
