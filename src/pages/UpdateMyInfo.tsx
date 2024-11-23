import { useForm } from "react-hook-form";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Form from "../components/common/Form";

function UpdateMyInfo() {
  const { register, watch, handleSubmit } = useForm();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const onValid = (data: any) => {};

  return (
    <>
      <Title>회원정보 수정</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="name">이름</label>
        <input
          {...(register("name"), { required: true })}
          placeholder="이름을 입력하세요"
        />
        <label htmlFor="">아이디</label>
        <input {...register("id")} placeholder="~가져온 아이디~" />
        <label htmlFor="전화번호">전화번호</label>
        <input {...register("tel")} placeholder="- 없이 쓰삼" />
      </Form>

      <span>문자 메시지로 알림 받기</span>
      <span>문자 메시지 관련된 설명... 어쩌구 저쩌구</span>

      <ButtonL category="pink">수정하기</ButtonL>
      <br />
      <span>고마워써 탈퇴하기</span>
    </>
  );
}

export default UpdateMyInfo;
