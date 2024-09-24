"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";

export const searchItems = async (searchTerm: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/search-items?searchTerm=${searchTerm}`
    );

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
