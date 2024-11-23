import { useForm } from "react-hook-form";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Form from "../components/common/Form";
import DescriptionS from "../components/common/DescriptionS";

function Apply2() {
  const { register, watch, handleSubmit } = useForm();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const sender = "하하하호호";

  const onValid = (data: any) => {};

  return (
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

        <label htmlFor="tel">전화번호</label>
        <input {...register("tel")} />
        <DescriptionS>
          1월 1일, 연하장 확인 안내 메시지 전송을 위해서만 사용됩니다.
        </DescriptionS>

        <label htmlFor="info">소속 / 기타</label>
        <input {...register("info")} />
        <DescriptionS>확실한 구분을 위한 정보를 입력해 주세요</DescriptionS>
      </Form>
      <ButtonL category="pink">신청하기</ButtonL>
    </>
  );
}

export default Apply2;
