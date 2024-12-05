import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import ButtonS from "../components/common/ButtonS";
import Form from "../components/common/Form";
import Title from "../components/common/Title";
import { IUser, loadUserInfo } from "../fetcher";
import { toast } from "react-toastify";

const SmsOption = styled.div`
  padding-top: 120px;
  text-align: center;
  font-size: 80%;

  input[type="checkbox"] {
    margin: 0;
    width: auto;
    height: auto;
  }

  div {
    padding: 10px 0;
    font-size: 80%;
    color: #666;
  }
`;

const Withdrawal = styled.span`
  padding-top: 10px;
  text-align: center;
  font-size: 60%;
  color: #666;
`;

export const ModalContent = styled.div`
  text-align: center;
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 7px; /* 입력창 안쪽 여백 */
    margin-bottom: 20px; /* 입력창 간 간격 */
    border: 1px solid #ccc; /* 테두리 */
    border-radius: 5px;
    font-size: 16px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      border-color: #007bff;
      outline: none; /* 기본 포커스 테두리 제거 */
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 포커스 시 추가 효과 */
    }

    &::placeholder {
      color: #aaa;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
    }
  }
`;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    padding: "30px 20px",
    textAlign: "center" as "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 추가
    border: "none", // 테두리 제거
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 더 어두운 오버레이
  },
};

function UpdateMyInfo() {
  // userId 임의로 가정하기
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const nav = useHistory();

  const { register, watch, handleSubmit, setValue } = useForm<IUser>();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const onValid = async (formData: IUser) => {
    try {
      await axios.put(`/api/users/${userId}`, formData);
      toast.success("저장이 완료되었습니다.");
    } catch (error) {
      toast.error("저장에 실패했습니다. 다시 시도해 보세요.");
    }
  };

  const onInvalid = (errors: any) => {};

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    nav.push("/");
  };

  const WithdrawalProc = async () => {
    openConfirmModal();
  };

  const handleWithdrawl = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      closeConfirmModal();
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("탈퇴 실패:", error);
      alert("탈퇴 중 오류가 발생했습니다.");
    }
  };

  const { isLoading, data, error } = useQuery<IUser>(
    ["loadUserInfo", userId],
    () => loadUserInfo(userId),
    {
      onSuccess: (data) => {
        setValue("name", data.name);
        setValue("kakaoId", data.kakaoId);
        setValue("tel", data.tel);
        setValue("isSmsAllowed", data.isSmsAllowed);
      },
    }
  );

  return (
    <>
      <Title>회원정보 수정</Title>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
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
        <SmsOption>
          <span>
            <input type="checkbox" {...register("isSmsAllowed")} /> 문자
            메시지로 알림 받기
          </span>
          <div>
            내년 1월 1일 이후에 로그인하여 도착한 연하장을 확인할 수 있어요.
            <br />
            만약 연하장을 확인할 수 있는 별도의 고유 링크가 필요할 경우,
            <br />
            문자 메시지로 알림 받기 옵션을 체크해 주세요.
          </div>
        </SmsOption>
        <ButtonL category="pink">저장하기</ButtonL>
        <Withdrawal onClick={WithdrawalProc}>고마워써 탈퇴하기</Withdrawal>
      </Form>

      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={closeConfirmModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <h3>정말 탈퇴하시겠습니까?</h3>
          <p>탈퇴 시 회원 정보와 관련 데이터는 삭제됩니다.</p>
          <ButtonS category="pink" onClick={handleWithdrawl}>
            확인
          </ButtonS>
          &emsp;
          <ButtonS category="pink" onClick={closeConfirmModal}>
            취소
          </ButtonS>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <h3>탈퇴 처리가 완료되었습니다.</h3>
          <p>다음에 또 만나요~~~~</p>
          <ButtonS
            category="pink"
            className="confirm"
            onClick={closeSuccessModal}
          >
            닫기
          </ButtonS>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateMyInfo;
