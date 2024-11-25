import { useState } from "react";
import axios from "axios";

export interface IUserInfoType {
  id: number;
  kakaoId: string;
  name: string;
  tel: string;
  isSmsAllowed: boolean;
}

export const loadUserInfo = async (userId: number): Promise<IUserInfoType> => {
  try {
    const response = await axios.get<IUserInfoType>(`api/users/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
