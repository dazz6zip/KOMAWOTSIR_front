// 비회원 신청: 전화번호로 회원 & receiver 등록 여부 체크
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ASenderState } from "../atoms";
import ButtonL from "../components/common/ButtonL";
import ButtonS from "../components/common/ButtonS";
import Description from "../components/common/Description";
import DescriptionS from "../components/common/DescriptionS";
import Form from "../components/common/Form";
import { ModalContent, ModalStyle } from "../components/common/ModalStyle";
import Title from "../components/common/Title";
import { IQuestionItem } from "../fetcher";

function ApplyWithoutLogin() {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false); // 회원이거나 이미 신청했을 때
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const closeMemberModal = () => setIsMemberModalOpen(false);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  const closeInquiryModal = () => setIsInquiryModalOpen(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  // watch: 실시간 변화 관찰, getValues: 특정 시점 값 읽기

  const sender = useRecoilValue(ASenderState);
  const [questions, setQuestions] = useState<IQuestionItem[]>();

  const onValid = async (data: any) => {
    const tel = data.tel;
    try {
      const response = await axios.get<string>(
        `/api/users/check/${sender.id}/${tel}`
      );
      if (response.data == "member") {
        alert("회원입니다."); // 회원 -> 카카오 로그인 ㄱㄱ
        setIsMemberModalOpen(true);
      } else if (response.data == "receiver") {
        history.push("/apply/already");
      } else {
        getInquiry();
      }
    } catch (error) {
      console.error("사용자 검사 실패:", error);
    }
  };

  const getInquiry = async () => {
    try {
      const response = await axios.get<IQuestionItem[]>(
        `/api/inquiry/{sender.id}` // 질문목록 불러오기
      );
      if (response.data.length > 0) {
        setQuestions(response.data);
        setIsInquiryModalOpen(true);
      } else {
        getInquiry();
      }
    } catch (error) {
      console.error("질문 목록 불러오기 실패:", error);
    }
  };

  return (
    <>
      <Title>
        {sender.name}님에게
        <br /> 연하장 신청하기
      </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="nickname">닉네임</label>
        <DescriptionS>
          {sender.name}님이 알아볼 수 있는 이름으로 입력해 주세요.
        </DescriptionS>
        <input
          {...register("nickname", { required: "닉네임을 입력해 주세요." })}
        />
        {errors.nickname && (
          <p style={{ color: "red" }}>{errors.nickname.message}</p>
        )}

        <label htmlFor="tel">전화번호</label>
        <DescriptionS>
          1월 1일, 연하장 확인 안내 메시지 전송을 위해서만 사용됩니다.
        </DescriptionS>
        <input
          {...register("tel", {
            required: "전화번호를 입력해 주세요.",
            pattern: {
              value: /^\d{11}$/,
              message: "전화번호는 숫자 11자리로 입력해 주세요.",
            },
          })}
        />
        {errors.tel && <p style={{ color: "red" }}>{errors.tel.message}</p>}

        <label htmlFor="info">소속 / 기타</label>
        <DescriptionS>확실한 구분을 위한 정보를 입력해 주세요.</DescriptionS>
        <input
          {...register("info", { required: "소속 정보를 입력해 주세요." })}
        />
        {errors.info && <p style={{ color: "red" }}>{errors.info.message}</p>}

        <ButtonL category="pink" type="submit">
          신청하기
        </ButtonL>
      </Form>

      <Modal
        isOpen={isInquiryModalOpen}
        onRequestClose={closeInquiryModal}
        style={ModalStyle}
      >
        <ModalContent>
          <Title>질문 목록</Title>
          {questions?.map((q) => (
            <>
              <h2>{q.question}</h2>
              <DescriptionS>{q.description}</DescriptionS>
              <input type="text" />
            </>
          ))}
          {/* 입력자료 검사. form으로 변경 */}
          <ButtonS category="white" onClick={() => setIsConfirmModalOpen(true)}>
            신청하기
          </ButtonS>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isMemberModalOpen}
        onRequestClose={closeMemberModal}
        style={ModalStyle}
      >
        <ModalContent>
          <Description>너!! 회원이잖아!!</Description>
          <ButtonS category="white" onClick={() => history.push("/apply")}>
            로그인하여 신청하기
          </ButtonS>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={closeConfirmModal}
        style={ModalStyle}
      >
        <ModalContent>
          <h3>신청하시겠습니까?</h3>
          <p>
            정보를 제대로 입력했는지 확인해 주세요.
            <br />
            신청한 이후에는 수정하거나, <br />
            취소할 수 없어요.
          </p>
          <ButtonS category="white" onClick={closeConfirmModal}>
            다시 확인하기
          </ButtonS>
          <ButtonS category="pink">이대로 신청하기</ButtonS>
          &emsp;
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApplyWithoutLogin;
