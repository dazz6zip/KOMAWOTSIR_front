import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useRecoilValue } from "recoil";
import { ASenderState } from "../atoms";
import ButtonL from "../components/common/ButtonL";
import Description from "../components/common/Description";
import Form from "../components/common/Form";
import Img from "../components/common/Img";
import { ModalStyle } from "../components/common/ModalStyle";
import Title from "../components/common/Title";
import { IUserInfoType } from "../fetcher";
import main from "../images/main.png";
import { ModalContent } from "./UpdateMyInfo";

function ReceiverAdder() {
  const sender = useRecoilValue(ASenderState);
  const { register, watch, handleSubmit } = useForm();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  // register: onChange, value, useState를 모두 대체하는 함수!
  // watch: form의 입력값 추적
  // handleSubmit: validation, preventDefault 담당

  const onValid = async (data: any) => {
    const tel = data.tel;
    try {
      const response = await axios.get<IUserInfoType>( // 이미 신청한 사람인지 체크
        `/api/users/check/${sender.id}/${tel}`
      );
      if (response.data.id) {
        setIsConfirmModalOpen(true);
      } else {
        addReceiver(response.data);
      }
    } catch (error) {
      console.error("사용자 검사 실패:", error);
    }
  };

  const addReceiver = async (receiver: IUserInfoType) => {
    try {
      const response = await axios.post<boolean>(
        `/api/users/${sender.id}/receivers`,
        receiver
      );
      alert("추가 성공");
    } catch (error) {
      console.error("수신자 추가 실패:", error);
    }
  };

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
          <ButtonL category="pink">신청하기</ButtonL>
        </Form>
        <Img src={main} width="50%" alt="Main" className="logo-image" />
        <Modal
          isOpen={isConfirmModalOpen}
          onRequestClose={closeConfirmModal}
          style={ModalStyle}
        >
          <ModalContent>
            <h3>이미 신청했습니다!</h3>
          </ModalContent>
        </Modal>
      </>
    </>
  );
}

export default ReceiverAdder;
