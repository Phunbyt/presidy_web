import { toast } from "react-toastify";
import { axiosClient } from "../factory";

export const signup = async (payload: Record<string, string>) => {
  try {
    const { data } = await axiosClient.post(`auth/sign-up`, payload);

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const signin = async (payload: Record<string, string>) => {
  try {
    const { data } = await axiosClient.post(`auth/sign-in`, payload);

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const sendOtp = async (payload: Record<string, string>) => {
  try {
    const { data } = await axiosClient.post(`auth/send-otp`, payload);

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);

    return { error: true, message: error.response.data.message };
  }
};

export const sendResetOtp = async (payload: Record<string, string>) => {
  try {
    const { data } = await axiosClient.post(`auth/reset-otp`, payload);

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);

    return { error: true, message: error.response.data.message };
  }
};

export const sendExistingUserOtp = async (
  payload: Record<string, string>,
  token: string | undefined
) => {
  try {
    const { data } = await axiosClient.post(
      `auth/send-otp/existing-user`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);

    return { error: true, message: error.response.data.message };
  }
};

export const verifyOtp = async (
  payload: Record<string, string>,
  token: string
) => {
  try {
    const { data } = await axiosClient.post(`auth/verify-otp`, payload, {
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

export const googleSignUp = async (token: string) => {
  try {
    const { data } = await axiosClient.post(
      `auth/sign-up-google`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);

    return { error: true, message: error.response.data.message };
  }
};

export const googleSignIn = async (token: string) => {
  try {
    const { data } = await axiosClient.get(`auth/sign-in-google`, {
      headers: {
        Authorization: token,
      },
    });

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);

    return { error: true, message: error.response.data.message };
  }
};

export const resetPassword = async (
  payload: Record<string, string>,
  token: string
) => {
  try {
    const { data } = await axiosClient.patch(`auth/change-password`, payload, {
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
