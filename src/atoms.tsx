import { atom } from "recoil";
import { EFontColor, EFontSize, IDesignPost } from "./fetcher";

export const ADesignState = atom<IDesignPost>({
  key: "ADesign",
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
