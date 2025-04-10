import { toast } from "react-toastify";
import { axiosClient } from "../factory";

export const registerModerator = async (
  payload: Record<string, any>,
  token: string
) => {
  try {
    const { data } = await axiosClient.post(`moderator/register`, payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};
export const addBankAccount = async (
  payload: Record<string, any>,
  token: string
) => {
  try {
    const { data } = await axiosClient.post(`moderator/account`, payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};
export const addPlan = async (payload: Record<string, any>, token: string) => {
  try {
    const { data } = await axiosClient.post(`moderator/plan`, payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const getModeratorDashboardData = async (token: string) => {
  try {
    const { data } = await axiosClient.get(`moderator/dashboard`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const getAvailablePlans = async (token: string) => {
  try {
    const { data } = await axiosClient.get(`moderator/available-plans`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};
