import { useState } from "react";
import axios from "axios";

export interface IUserInfoType {
  id: number;
  kakaoId: string;
  name: string;
  tel: string;
  isSmsAllowed: boolean;
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
