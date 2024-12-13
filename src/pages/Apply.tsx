// 회원이 수신 신청
import axios from "axios";
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
import { toast } from "react-toastify";

function Apply() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const { register, getValues, handleSubmit } = useForm();
  const history = useHistory();

  const sender = useRecoilValue(ASenderState);
  const [questions, setQuestions] = useState<IQuestionItem[]>();

  const { data } = useQuery<IQuestionItem[]>(
    ["questionLoad", sender.id],
    () => getQuestion(sender.id),
    {
      onSuccess: (d) => {
        setQuestions(d);
      },
    }
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
    console.log("전송 데이터:", receiverAdder);
    try {
      await axios.post(`/api/users/${sender.id}/receivers`, receiverAdder);
      history.push("/apply/done");
    } catch (error) {
      toast.error("신청에 실패했습니다. 다시 시도해 주세요.");
      console.error("신청 중 오류 발생:", error);
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
          <ButtonL category="pink" type="submit">
            신청하기
          </ButtonL>
        </Form>
      </>
    </>
  );
}

export default Apply;
