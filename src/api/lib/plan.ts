import { toast } from "react-toastify";
import { axiosClient } from "../factory";

export const getAPublicPlans = async () => {
  try {
    const { data } = await axiosClient.get(`plan/public`);

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const getAvailablePlans = async ({ token }: { token: string }) => {
  try {
    const { data } = await axiosClient.get(`plan/all`, {
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

export const getUserPlans = async ({ token }: { token: string }) => {
  try {
    const { data } = await axiosClient.get(`plan/user`, {
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

export const subscribeToPlan = async ({
  token,
  payload,
}: {
  token: string;
  payload: Record<string, any>;
}) => {
  try {
    const { data } = await axiosClient.post(`plan/subscribe`, payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const getPlanTransactions = async ({ token }: { token: string }) => {
  try {
    const { data } = await axiosClient.get(`plan/transactions`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const reportPlanDispute = async ({
  token,
  planId,
  dispute,
}: {
  token: string;
  planId: string;
  dispute: string;
}) => {
  try {
    const { data } = await axiosClient.post(
      `plan/dispute`,
      { planId, dispute },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const sendSupportMessage = async ({
  email,
  message,
}: {
  email: string;
  message: string;
}) => {
  try {
    const { data } = await axiosClient.post(`plan/message`, { message, email });

    return data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};

export const getFamilyDetails = async ({
  familyUrlId,
}: {
  familyUrlId: string;
}) => {
  try {
    const { data } = await axiosClient.get(`family/${familyUrlId}`);

    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return { error: true, message: error.response.data.message };
  }
};
