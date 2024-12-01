import axios from "axios";

export interface IUserInfoType {
  id: number;
  kakaoId: string;
  name: string;
  tel: string;
  isSmsAllowed: boolean;
}

export interface KakaoLoginResponse {
  redirectUri: string;
  clientId: string;
}

export interface IQuestionItem {
  id?: number;
  inquiryId?: number;
  question: string;
  description: string;
}

export interface IReceiverList {
  id: number;
  senderId: number;
  nickname: string;
  tel: string;
  memo: string;
  year?: string;
  receiverUserId: number;
  isDeleted: boolean;
  userId: number;
  userKakaoId: string;
  postStatus: PostStatus;
  postContents: string;
}

export enum PostStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  PROGRESSING = "PROGRESSING",
}

export const PostStatusMap: Record<PostStatus, string> = {
  [PostStatus.COMPLETED]: "작성 완료",
  [PostStatus.PENDING]: "작성 전",
  [PostStatus.PROGRESSING]: "작성 중",
};

export interface IReceiverQuestionList {
  id: number;
  inquiryItemId: number;
  receiverId: number;
  answer: string;
  question: string;
}

export interface IPostContentsLoad {
  id: number;
  senderId: number;
  senderNickname: string;
  receiverId: number;
  contents: string;
}

export interface IDraftLoad {
  id: number;
  userId: number;
  title: string;
  contents: string;
}

export interface IDesignPost {
  designId?: number;
  thumbnailPic?: string;
  backgroundPic?: string;
  thumbnailId?: number;
  backgroundId?: number;
  fontId?: number;
  fontSize?: EFontSize;
  fontColor?: EFontColor;
  fontUrl?: string;
  fontName?: string;
}

export enum EFontSize {
  bigSize = "bigSize",
  defaultSize = "defaultSize",
}

export enum EFontColor {
  white = "white",
  black = "black",
}

export interface IFont {
  id: number;
  name: string;
  url: string;
}

export interface IPresent {
  // 내가 받은 연하장
  id: number;
  senderId: string;
  senderNickname: string;
  receiverId: string;
  contents: string;
  year: number;
}

export const PresentLoad = async (receiverId: number): Promise<IPresent[]> => {
  try {
    const response = await axios.get<IPresent[]>(
      `/api/receivers/${receiverId}/posts`
    );
    return response.data.map((item) => ({
      ...item,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadUserInfo = async (userId: number): Promise<IUserInfoType> => {
  try {
    const response = await axios.get<IUserInfoType>(`/api/users/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createQuestion = async (
  userId: number
): Promise<IQuestionItem[]> => {
  try {
    const response = await axios.get<IQuestionItem[]>(`/api/inquiry/${userId}`);
    return response.data.map((item) => ({
      ...item,
      description: item.description || "",
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const PostList = async (userId: number): Promise<IReceiverList[]> => {
  try {
    const response = await axios.get<IReceiverList[]>(
      `/api/users/${userId}/receivers`
    );
    return response.data.map((item) => ({
      ...item,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const ReceiverInquiryList = async (
  userId: number,
  receiverId: number
): Promise<IReceiverQuestionList[]> => {
  try {
    const response = await axios.get<IReceiverQuestionList[]>(
      `/api/users/${userId}/receivers/${receiverId}`
    );
    return response.data.map((item) => ({
      ...item,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const PostContentsCheck = async (
  userId: number,
  receiverId: number
): Promise<number> => {
  try {
    const response = await axios.get<number>(
      `/api/posts/check/${userId}/${receiverId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const PostContentsLoad = async (
  postId: number
): Promise<IPostContentsLoad> => {
  try {
    const response = await axios.get<IPostContentsLoad>(`/api/posts/${postId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const DraftLoad = async (userId: number): Promise<IDraftLoad[]> => {
  try {
    const response = await axios.get<IDraftLoad[]>(
      `/api/users/${userId}/drafts`
    );
    return response.data.map((item) => ({
      ...item,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const GptLoad = async (prompt: string): Promise<String> => {
  try {
    const response = await axios.get<string>(`/api/posts/write/gpt`, {
      params: {
        prompt: prompt,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const DesignPostLoad = async (userId: number): Promise<IDesignPost> => {
  try {
    const response = await axios.get<IDesignPost>(
      `/api/posts/design/${userId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const FontLoad = async (): Promise<IFont[]> => {
  try {
    const response = await axios.get<IFont[]>(`/api/fonts`);
    return response.data.map((item) => ({
      ...item,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
