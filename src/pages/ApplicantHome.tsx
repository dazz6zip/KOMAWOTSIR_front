import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ButtonL from "../components/common/ButtonL";
import Description from "../components/common/Description";
import Img from "../components/common/Img";
import Title from "../components/common/Title";
import { IUserInfoType, KakaoLoginResponse } from "../fetcher";
import kakao from "../images/kakao.png";
import main from "../images/main.png";

const LogoSection = styled.div`
  text-align: center;
`;

function ApplicantHome() {
  const [sender, setSender] = useState("");
  const history = useHistory();

  useEffect(() => {
    // url에 userId가 있다고 가정 (암호화 필요성 고민 ..)
    const urlParams = new URLSearchParams(window.location.search);
    const senderId = urlParams.get("sender");

    if (senderId) {
      axios
        .get<IUserInfoType>(`/api/users/{senderId}`)
        .then((response) => {
          setSender(response.data.name);
        })
        .catch((error) => {
          console.error("수신자 정보 확인 불가능", error);
        });
    }
  }, []);

  const kakaoLogin = async () => {
    try {
      const response = await axios.get<KakaoLoginResponse>(
        "/api/users/kakao/loginPage"
      );
      const { clientId, redirectUri } = response.data;

      console.log(response.data);

      // 카카오 인증 페이지로 리디렉션
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("kakao 오류");
    }
  };

  const applyWithoutLogin = () => {
    history.push("/apply", { sender, userType: "guest" });
  };

  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Title>
        {sender}님에게
        <br />
        연하장 신청하기
      </Title>
      <Description>
        문자 메시지로 알림을 받지 않고
        <br />
        수신된 연하장을 확인하고 싶다면,
        <br />
        회원가입 후 이용해주세요.
      </Description>
      <Img src={kakao} width="50%" alt="Kakao Login" onClick={kakaoLogin} />
      <ButtonL category="white" onClick={applyWithoutLogin}>
        비회원으로 신청하기
      </ButtonL>
    </>
  );
}

export default ApplicantHome;
