import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ASenderState } from "../atoms";
import ButtonL from "../components/common/ButtonL";
import Description from "../components/common/Description";
import Img from "../components/common/Img";
import Title from "../components/common/Title";
import main from "../images/main.png";

const LogoSection = styled.div`
  text-align: center;
`;

function AlreadyApplied() {
  const sender = useRecoilValue(ASenderState);
  const history = useHistory();

  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Title>
        {sender.name}님에게
        <br />
        이미 연하장을 신청하셨습니다.
      </Title>
      <Description>
        신년에 연하장이 도착하면,
        <br />
        입력하신 전화번호로
        <br />
        안내 메시지를 보내드릴게요.
        <br />
        내년에 만나요!
      </Description>
      <ButtonL category="pink" onClick={() => history.push("/")}>
        홈으로 이동
      </ButtonL>
    </>
  );
}

export default AlreadyApplied;
