// 회원이 수신자 신청
import { useForm } from "react-hook-form";
import ButtonL from "../components/common/ButtonL";
import DescriptionS from "../components/common/DescriptionS";
import Form from "../components/common/Form";
import Title from "../components/common/Title";

function Apply1() {
  const { register, watch, handleSubmit } = useForm();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const receiverId = parseInt(sessionStorage.getItem("userId") || "0");
  const sender = "하하하호호";

  const onValid = (data: any) => {};

  return (
    <>
      <>
        <Title>
          {sender}님에게
          <br /> 연하장 신청하기
        </Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="nickname">닉네임</label>
          <DescriptionS>
            {sender}님이 알아볼 수 있는 이름으로 입력해 주세요.
          </DescriptionS>
          <input {...(register("nickname"), { required: true })} />

          <label htmlFor="info">소속 / 기타</label>
          <DescriptionS>확실한 구분을 위한 정보를 입력해 주세요</DescriptionS>
          <input {...register("info")} />
        </Form>
        <ButtonL category="pink">신청하기</ButtonL>
      </>
    </>
  );
}

export default Apply1;
