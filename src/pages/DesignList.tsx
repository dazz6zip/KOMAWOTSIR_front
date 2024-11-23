import styled from "styled-components";
import imsi2 from "../images/imsi2.jpg";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import DescriptionS from "../components/common/DescriptionS";
import Img from "../components/common/Img";

function DesignList() {
  return (
    <>
      <Title>연하장 배경 변경하기</Title>
      <ButtonRow>
        <ButtonS category="blue">단색</ButtonS>
        <ButtonS category="gray">그라데이션</ButtonS>
        <ButtonS category="gray">일러스트</ButtonS>
        <ButtonS category="gray">시즌</ButtonS>
      </ButtonRow>
      <Img src={imsi2} width="90%" alt="Main" className="logo-image" />
      <ButtonL category="blue">+ 직접 등록하기</ButtonL>
      <ButtonL category="pink">저장하기</ButtonL>
    </>
  );
}

export default DesignList;
