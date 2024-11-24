import { useForm } from "react-hook-form";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Form from "../components/common/Form";
import { useQuery } from "react-query";
import { IUserInfoType, loadUserInfo } from "../fetcher";
import { useEffect } from "react";
import styled from "styled-components";

const Descirpt = styled.span`
  font-size: 60%;
  text-align: center;
  color: "#555";
`;

function UpdateMyInfo() {
  // userId 임의로 가정하기
  const userId = 5;

  const { register, watch, handleSubmit, setValue } = useForm();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const onValid = () => {
    // axios.post()
  };

  // const { isLoading, data, error } = useQuery<IUserInfoType>(
  //   ["loadUserInfo", userId],
  //   () => loadUserInfo(userId)
  // );

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
        <input {...(register("id"), { required: true })} disabled />
        <label htmlFor="전화번호">전화번호</label>
        <input
          {...(register("tel"), { required: true })}
          placeholder="- 없이 쓰삼"
        />
      </Form>

      <span>문자 메시지로 알림 받기</span>
      <Descirpt>
        내년 1월 1일 이후에 로그인하여 도착한 연하장을 확인할 수 있어요.
        <br />
        만약 연하장을 확인할 수 있는 별도의 고유 링크가 필요할 경우,
        <br />
        문자 메시지로 알림 받기 옵션을 체크해 주세요.
      </Descirpt>

      <ButtonL category="pink">저장하기</ButtonL>
      <br />
      <span>고마워써 탈퇴하기</span>
    </>
  );
}

export default UpdateMyInfo;
