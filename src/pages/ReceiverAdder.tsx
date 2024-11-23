import { useForm } from "react-hook-form";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Form from "../components/common/Form";
import main from "../images/main.png";
import Description from "../components/common/Description";
import Img from "../components/common/Img";

function ReceiverAdder() {
  const { register, watch, handleSubmit } = useForm();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const sender = "하하하호호";

  const onValid = (data: any) => {};

  return (
    <>
      <>
        <Title>
          2025 연하장
          <br />
          수신인 추가하기
        </Title>
        <Description>직접 추가하여 연하장을 보낼 수 있어요.</Description>
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="nickname">닉네임</label>
          <input {...(register("nickname"), { required: true })} />

          <label htmlFor="tel">전화번호</label>
          <input {...register("tel")} />
        </Form>
        <ButtonL category="pink">신청하기</ButtonL>
        <Img src={main} width="50%" alt="Main" className="logo-image" />
      </>
    </>
  );
}

export default ReceiverAdder;
