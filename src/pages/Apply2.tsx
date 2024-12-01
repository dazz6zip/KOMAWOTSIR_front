// 비회원이 수신 신청
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import ButtonL from "../components/common/ButtonL";
import ButtonS from "../components/common/ButtonS";
import DescriptionS from "../components/common/DescriptionS";
import Form from "../components/common/Form";
import { ModalContent, ModalStyle } from "../components/common/ModalStyle";
import Title from "../components/common/Title";

function Apply2() {
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const closeCheckModal = () => setIsCheckModalOpen(false);
  const { register, watch, handleSubmit } = useForm();

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
        <DescriptionS>
          1월 1일, 연하장 확인 안내 메시지 전송을 위해서만 사용됩니다.
        </DescriptionS>
        <input {...register("tel")} />

        <label htmlFor="info">소속 / 기타</label>
        <DescriptionS>확실한 구분을 위한 정보를 입력해 주세요.</DescriptionS>
        <input {...register("info")} />
      </Form>
      <ButtonL category="pink" onClick={() => setIsCheckModalOpen(true)}>
        신청하기
      </ButtonL>

      <Modal
        isOpen={isCheckModalOpen}
        onRequestClose={closeCheckModal}
        style={ModalStyle}
        ariaHideApp={false}
      >
        <ModalContent>
          <h3>신청하시겠습니까?</h3>
          <p>
            정보를 제대로 입력했는지 확인해 주세요.
            <br />
            신청한 이후에는 수정하거나, 취소할 수 없어요.
          </p>
          <ButtonS category="white" onClick={closeCheckModal}>
            다시 확인하기
          </ButtonS>
          <ButtonS category="pink">이대로 신청하기</ButtonS>
          &emsp;
        </ModalContent>
      </Modal>
    </>
  );
}

export default Apply2;
