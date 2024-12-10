import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Description from "../components/common/Description";
import Img from "../components/common/Img";
import { IUser } from "../fetcher";
import kakao from "../images/kakao.png";
import main from "../images/main.png";
import ButtonS from "../components/common/ButtonS";
import { ImgWrapper, LogoSection } from "../StyledComponents";

interface KakaoLoginResponse {
  redirectUri: string;
  clientId: string;
}

function Home() {
  const nav = useHistory();

  const userId = parseInt(sessionStorage.getItem("userId") || "0");

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
      console.error("kakao 오류남!");
    }
  };

  useEffect(() => {
    // 3. 리디렉션 후 돌아온 URL에서 'code' 파라미터를 추출하여 백엔드로 전달
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // code가 존재하면 서버로 전달
      axios
        .get<IUser>(`/api/users/kakao/login-test?code=${code}`)
        .then((response) => {
          console.log("로그인 성공", response);
          sessionStorage.setItem("userId", response.data.id.toString());

          const link = sessionStorage.getItem("apply_kakao");
          if (response.data.tel === null) {
            nav.push(`/update-info`);
          } else if (link != null) {
            sessionStorage.removeItem("apply_kakao");
            nav.push(`/apply/to/${link}`);
          } else {
            nav.push(`/`);
          }
        })
        .catch((error) => {
          console.error("로그인 실패", error);
        });
    }
  }, []);
  return (
    <>
      <LogoSection>
        <Img src={main} width="100%" alt="Main" className="logo-image" />
      </LogoSection>
      <Description>
        디지털 연하장 서비스에 <br />
        오신 것을 환영합니다! <br />
        따뜻한 마음을 담아
        <br /> AI와 함께 연하장을 제작해 보세요.
      </Description>
      {userId ? (
        <>
          <br />
          <br />
          <ButtonS category="pink" onClick={() => nav.push(`/create-form`)}>
            연하장 신청받기
          </ButtonS>
        </>
      ) : (
        <ImgWrapper onClick={kakaoLogin}>
          <Img src={kakao} width="50%" alt="Kakao Login" />
        </ImgWrapper>
      )}
    </>
  );
}

export default Home;
