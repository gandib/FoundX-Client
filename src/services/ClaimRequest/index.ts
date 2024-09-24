"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { FieldValues } from "react-hook-form";

export const addClaimRequest = async (
  claimRequest: FieldValues
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/claim-request", claimRequest);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateClaimRequestStatus = async (
  claimRequestStatus: FieldValues
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(
      `/claim-request/${claimRequestStatus.id}`,
      claimRequestStatus.data
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

export const getReceivedClaimRequest = async () => {
  try {
    const { data } = await axiosInstance.get(
      "/claim-request/received-claim-request"
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
