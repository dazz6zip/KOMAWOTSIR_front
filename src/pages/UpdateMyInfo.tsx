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

  const { register, watch, handleSubmit, setValue } = useForm<IUserInfoType>();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const onValid = async (formData: IUserInfoType) => {
    try {
      const response = await axios.post(`/api/users/${userId}`, formData);
      console.log("저장 성공:", response.data);
      alert("저장되었습니다!");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const { isLoading, data, error } = useQuery<IUserInfoType>(
    ["loadUserInfo", userId],
    () => loadUserInfo(userId),
    {
      onSuccess: (data) => {
        // 데이터가 성공적으로 로드되면 setValue로 폼 값 설정
        setValue("name", data.name);
        setValue("kakaoId", data.kakaoId); // 숫자를 문자열로 변환
        setValue("tel", "0" + data.tel);
      },
    }
  );

  console.log(data);

  return (
    <>
      <Title>회원정보 수정</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="name">이름</label>
        <input
          {...register("name", { required: true })}
          id="name"
          placeholder="이름을 입력하세요"
        />
        <label htmlFor="kakaoId">아이디</label>
        <input {...register("kakaoId", { required: true })} disabled />
        <label htmlFor="tel">전화번호</label>
        <input
          {...register("tel", { required: true })}
          placeholder="- 없이 쓰삼"
        />
      </Form>

      <input type="checkbox" {...register("isSmsAllowed")} />
      <label htmlFor="sms">문자 메시지로 알림 받기</label>

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
