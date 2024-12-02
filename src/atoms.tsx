import { atom } from "recoil";
import { EFontColor, EFontSize, IDesignPost, IUserInfoType } from "./fetcher";

export const ADesignState = atom<IDesignPost>({
  key: "ADesignState",
  default: {
    designId: 0,
    thumbnailPic: "",
    thumbnailId: 0,
    backgroundPic: "",
    backgroundId: 0,
    fontId: 0,
    fontSize: EFontSize.bigSize,
    fontColor: EFontColor.white,
    fontUrl: "",
    fontName: "",
  },
});

export const ADesignLoadState = atom<boolean>({
  key: "ADesignLoadState",
  default: true,
});

export const AUserState = atom<IUserInfoType>({
  key: "userState",
  default: {
    id: 0,
    kakaoId: "",
    name: "",
    tel: "",
    isSmsAllowed: true,
  },
});

export const ASenderState = atom<IUserInfoType>({
  key: "senderState",
  default: {
    id: 0,
    kakaoId: "",
    name: "김보냄",
    tel: "",
    isSmsAllowed: true,
  },
});

export const AReceiverState = atom<IUserInfoType>({
  key: "AreceiverState",
  default: {
    id: 0,
    name: "최받음",
    tel: "",
    isSmsAllowed: true,
  },
});
