// 카카오 로그인: 해당 유저 receiver 등록 여부 체크
// 비회원 신청: ApplyWithoutLogin

import axios from "axios";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ASenderState } from "../atoms";
import ButtonL from "../components/common/ButtonL";
import Description from "../components/common/Description";
import Img from "../components/common/Img";
import Title from "../components/common/Title";
import { IUser, KakaoLoginResponse } from "../fetcher";
import kakao from "../images/kakao.png";
import main from "../images/main.png";
import { LogoSection } from "../StyledComponents";

interface Ilink {
  link: string;
}

function ApplicantHome() {
  const { link } = useParams<Ilink>();

  useEffect(() => {
    const validateUrl = async () => {
      try {
        const response = await axios.get<IUser>(`/api/inquiry/validate/url`, {
          params: {
            link: link,
          },
        });
        console.log(response);
        setSender(response.data);
      } catch (error) {
        console.error("URL 검증 실패:", error);
      }
    };

    validateUrl();
  }, [link]);

  const setSender = useSetRecoilState(ASenderState);
  const sender = useRecoilValue(ASenderState);
  const history = useHistory();

  const kakaoLogin = async () => {
    try {
      const response = await axios.get<KakaoLoginResponse>(
        "/api/users/kakao/loginPage"
      );
      const { clientId, redirectUri } = response.data;

      sessionStorage.setItem("apply_kakao", link);

      // 카카오 인증 페이지로 리디렉션
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("kakao 오류");
    }
  };

  const applyWithoutLogin = () => {
    history.push("/apply/guest");
  };

  return (
    <>
      <LogoSection>
        <Img src={main} width="70%" alt="Main" className="logo-image" />
      </LogoSection>
      <Title>
        {sender.name}님에게
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
      <br />
      <br />
      <Img src={kakao} width="50%" alt="Kakao Login" onClick={kakaoLogin} />
      <ButtonL category="white" onClick={applyWithoutLogin}>
        비회원으로 신청하기
      </ButtonL>
    </>
  );
}

export default ApplicantHome;
