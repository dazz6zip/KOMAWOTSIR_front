import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import ButtonL from "../components/common/ButtonL";
import Description from "../components/common/Description";
import Form from "../components/common/Form";
import Img from "../components/common/Img";
import { ModalStyle } from "../components/common/ModalStyle";
import Title from "../components/common/Title";
import { IReceiverSet, IReceiverToAdd } from "../fetcher";
import main from "../images/main.png";
import { ModalContent } from "../StyledComponents";

function ReceiverAdder() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const { register, handleSubmit, getValues } = useForm();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const history = useHistory();
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const onValid = async () => {
    const response = await axios.get<boolean>(
      `/api/users/${userId}/receivers/check/tel`,
      {
        params: {
          tel: getValues("tel"),
        },
      }
    );
    if (response.data) {
      setIsConfirmModalOpen(true);
    } else {
      addReceiver();
    }
  };

  const addReceiver = async () => {
    try {
      const receiver: IReceiverToAdd = {
        senderId: userId,
        tel: getValues("tel"),
        nickname: getValues("nickname"),
        memo: "직접 추가함",
      };

      const receiverAdder: IReceiverSet = {
        receiver: receiver,
      };
      await axios.post<boolean>(
        `/api/users/${userId}/receivers`,
        receiverAdder
      );
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("수신자 추가 실패:", error);
    }
  };

  return (
    <>
      <Title>
        2025 연하장
        <br />
        수신인 추가하기
      </Title>
      <Description>직접 추가하여 연하장을 보낼 수 있어요.</Description>
      <br />
      <br />
      <br />
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="nickname">닉네임</label>
        <input {...register("nickname", { required: true })} />
        <label htmlFor="tel">전화번호</label>
        <input {...register("tel")} />
        <ButtonL category="pink" type="submit">
          신청하기
        </ButtonL>
      </Form>
      <br />
      <br />
      <br />
      <Img src={main} width="60%" alt="Main" className="logo-image" />
      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={closeConfirmModal}
        style={ModalStyle}
      >
        <ModalContent>
          <h3>
            입력하신 수신번호
            <br />
            {getValues("tel")}는 <br />
            이미 신청목록에 존재합니다!
          </h3>
          <ButtonL category="gray" onClick={closeConfirmModal}>
            다시 입력하기
          </ButtonL>
          <ButtonL
            category="pink"
            onClick={() => history.push("/receiver-list")}
          >
            신청목록 보기
          </ButtonL>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        style={ModalStyle}
      >
        <ModalContent>
          <h3>
            수신인 목록에
            <br />
            {getValues("nickname")}님 ({getValues("tel")}) 을<br />
            추가했어요! 💌
          </h3>
          <ButtonL category="gray" onClick={closeSuccessModal}>
            계속 추가하기
          </ButtonL>
          <ButtonL
            category="pink"
            onClick={() => history.push("/receiver-list")}
          >
            신청목록 보기
          </ButtonL>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReceiverAdder;
