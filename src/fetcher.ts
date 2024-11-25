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
