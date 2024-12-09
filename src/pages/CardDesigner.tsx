import ButtonS from "../components/common/ButtonS";
import ButtonL from "../components/common/ButtonL";
import Title from "../components/common/Title";
import Description from "../components/common/Description";
import axios from "axios";
import Img from "../components/common/Img";
import { useQuery } from "react-query";
import { DesignPostLoad, EFontColor, EFontSize, IDesignPost } from "../fetcher";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ADesignLoadState, ADesignState } from "../atoms";
import { toast } from "react-toastify";
import {
  ColorButton,
  FontPreview,
  Options,
  PreviewArea,
  SizeButton,
} from "../StyledComponents";

function CardDesigner() {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");

  const [design, setDesign] = useRecoilState(ADesignState);
  const [designLoad, setDesignLoad] = useRecoilState(ADesignLoadState);

  const nav = useHistory();

  const { isLoading, data } = useQuery<IDesignPost>(
    ["designPost", userId],
    () => DesignPostLoad(userId),
    {
      enabled: designLoad,
      onSuccess: (data) => {
        setDesign({
          designId: data.designId,
          thumbnailPic: data.thumbnailPic,
          thumbnailId: data.thumbnailId,
          backgroundPic: data.backgroundPic,
          backgroundId: data.backgroundId,
          fontId: data.fontId,
          fontSize: data.fontSize,
          fontColor: data.fontColor,
          fontUrl: data.fontUrl,
          fontName: data.fontName,
        });
        setDesignLoad(false);
      },
    }
  );

  useEffect(() => {
    if (data?.fontUrl) {
      const link = document.createElement("link");
      link.href = data.fontUrl;
      link.rel = "stylesheet";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [[design.fontUrl]]);

  const editFontSize = (option: string) => {
    setDesign({
      ...design,
      fontSize:
        option === "default" ? EFontSize.defaultSize : EFontSize.bigSize,
    });
  };

  const editFontColor = (option: string) => {
    setDesign({
      ...design,
      fontColor: option === "white" ? EFontColor.white : EFontColor.black,
    });
  };

  const SaveDesign = () => {
    // 배경화면
    axios
      .put(
        `/api/users/${userId}/designs/${design.designId}/${true}/${
          design.backgroundId
        }`
      )
      .then(() => {
        // 썸네일
        axios.put(
          `/api/users/${userId}/designs/${design.designId}/${false}/${
            design.thumbnailId
          }`
        );
      })
      .then(() => {
        // 폰트
        axios.put(
          `/api/users/${userId}/designs/font/${design.fontId}/${design.fontSize}/${design.fontColor}`
        );
        toast.success("저장이 완료되었습니다.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("저장에 실패했습니다. 다시 시도해 보세요.");
      });
  };

  return (
    <>
      <Title>연하장 디자인하기</Title>
      <Description>
        신년 연하장의 디자인을 설정할 수 있어요.
        <br />
        2025년 작성하는 모든 연하장에
        <br />
        공통으로 적용됩니다.
      </Description>

      <PreviewArea
        bimage={design.backgroundPic}
        fFamily={design.fontName}
        fsize={design.fontSize === EFontSize.defaultSize ? 16 : 24}
        fColor={design.fontColor === EFontColor.white ? "white" : "black"}
      >
        <span>
          고마워써로 신년 인사를 전해 보세요!
          <br />이 공간에 연하장을 작성할 수 있어요.
        </span>
      </PreviewArea>

      <Options>
        <div>
          <label>배경화면</label>
          <ButtonS
            category="whitehotpink"
            onClick={() => nav.push(`../background`, { isFront: true })}
          >
            변경하기
          </ButtonS>
          <Img src={`${design.backgroundPic}`} width="20%" />
        </div>

        <div>
          <label>썸네일</label>
          <ButtonS
            category="whitehotpink"
            onClick={() => nav.push(`../background`, { isFront: false })}
          >
            변경하기
          </ButtonS>
          <Img src={`${design.thumbnailPic}`} width="20%" />
        </div>

        <div>
          <label>글꼴</label>
          <ButtonS
            category="whitehotpink"
            onClick={() => nav.push(`/font-list`)}
          >
            변경하기
          </ButtonS>
          <FontPreview fontFamily={design.fontName || "inherit"}>
            {design.fontName}
          </FontPreview>
        </div>

        <div>
          <label>글꼴 크기</label>
          <SizeButton
            isSelected={design.fontSize === EFontSize.defaultSize}
            onClick={() => editFontSize("default")}
          >
            보통
          </SizeButton>
          <SizeButton
            isSelected={design.fontSize === EFontSize.bigSize}
            onClick={() => editFontSize("big")}
          >
            크게
          </SizeButton>
        </div>

        <div>
          <label>글씨 색상</label>
          <ColorButton
            isSelected={design.fontColor === EFontColor.white}
            onClick={() => editFontColor("white")}
          >
            흰색
          </ColorButton>
          <ColorButton
            isSelected={design.fontColor === EFontColor.black}
            onClick={() => editFontColor("black")}
          >
            검은색
          </ColorButton>
        </div>
      </Options>

      <ButtonL category="pink" onClick={() => SaveDesign()}>
        저장하기
      </ButtonL>
    </>
  );
}

export default CardDesigner;
