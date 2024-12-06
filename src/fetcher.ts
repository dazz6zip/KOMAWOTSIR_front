import axios from "axios";

export interface IUser {
  id: number;
  kakaoId?: string;
  name: string;
  tel: string;
  isSmsAllowed: boolean;
}

export interface KakaoLoginResponse {
  redirectUri: string;
  clientId: string;
}

export interface IQuestionItem {
  // inquiry_item
  id?: number;
  inquiryId?: number;
  question: string;
  description: string;
}

export interface IReceiver {
  id: number;
  senderId: number;
  nickname: string;
  tel: string;
  memo: string;
  year?: string;
  receiverUserId?: number;
  isDeleted?: boolean;
  userId?: number;
  userKakaoId?: string;
  postStatus: PostStatus;
  postContents: string;
}

export interface IReceiverToAdd {
  senderId: number;
  nickname: string;
  tel: string;
  memo: string;
}

export interface IReceiverQuestionToAdd {
  inquiryItemId: number;
  answer: string;
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

export interface IReceiverQuestion {
  id?: number;
  inquiryItemId: number;
  receiverId?: number;
  answer: string;
  question?: string;
}

export interface IReceiverSet {
  receiver: IReceiverToAdd;
  answers?: IReceiverQuestionToAdd[];
}

export interface IPostImage {
  userId: number;
  file: Blob;
}

export interface IPostContents {
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

export interface IDesign {
  id?: number;
  category?: string;
  name?: string;
  pic?: string;
  isFront?: boolean;
  sourceType?: string;
  userId: string;
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
  postId: number;
  senderId: string;
  senderNickname: string;
  receiverId: string;
  contents: string;
  year: number;
  backgroundPic: string;
  thumbnailPic: string;
  fontName: string;
  fontSize?: string;
  fontColor?: string;
  fontUrl?: string;
}

export interface Iimage {
  id: number;
  category: string;
  name: string;
  pic: string;
  isFront: boolean;
  sourceType: ESoureceType;
  userId: number;
}

export enum ESoureceType {
  SERVICE = "SERVICE",
  USER = "USER",
}

export enum EImageCategory {
  solid = "solid",
  gradient = "gradient",
  season = "season",
  custom = "custom",
}

export const loadUserInfo = async (userId: number): Promise<IUser> => {
  try {
    const response = await axios.get<IUser>(`/api/users/${userId}`);
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

export const getQuestion = async (
  senderId: number
): Promise<IQuestionItem[]> => {
  try {
    const response = await axios.get<IQuestionItem[]>(
      `/api/inquiry/${senderId}`
    );
    return response.data.map((item) => ({
      ...item,
      description: item.description || "",
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const PostList = async (
  userId: number,
  checkboxValues: boolean[],
  page: number,
  size: number
): Promise<{ content: IReceiver[]; last: boolean }> => {
  try {
    const response = await axios.get<{
      content: IReceiver[];
      totalPages: number;
      number: number;
    }>(`/api/users/${userId}/receivers`, {
      params: {
        page,
        size,
        pending: checkboxValues[0],
        progressing: checkboxValues[1],
        completed: checkboxValues[2],
      },
    });

    const data = response.data;

    return {
      content: data.content,
      last: data.number + 1 >= data.totalPages,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const ReceiverInquiryList = async (
  userId: number,
  receiverId: number
): Promise<IReceiverQuestion[]> => {
  try {
    const response = await axios.get<IReceiverQuestion[]>(
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
): Promise<IPostContents> => {
  try {
    const response = await axios.get<IPostContents>(`/api/posts/${postId}`);
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

export const DesignLoad = async (): Promise<IDesign[]> => {
  try {
    const response = await axios.get<IDesign[]>(`/api/design`);
    return response.data.map((item) => ({
      ...item,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

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

export const imageLoad = async (
  type: string,
  userId: number,
  isFront: boolean
): Promise<Iimage[]> => {
  const category =
    type === "단색"
      ? EImageCategory.solid
      : type === "그라데이션"
      ? EImageCategory.gradient
      : type === "직접 업로드"
      ? EImageCategory.custom
      : EImageCategory.season;
  try {
    const response = await axios.get<Iimage[]>(
      `/api/images/${category}/${userId}/${isFront}`
    );
    return response.data.map((item) => ({
      ...item,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
