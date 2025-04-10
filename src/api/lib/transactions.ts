import { toast } from "react-toastify";
import { axiosClient } from "../factory";

interface TransactionParams {
  token: string;
  txRef: string;
}

export const getOneTransaction = async ({
  token,
  txRef,
}: TransactionParams) => {
  try {
    const { data } = await axiosClient.get(
      `transactions/single?txRef=${txRef}`,
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

export const getUserTransactions = async ({ token }: { token: string }) => {
  try {
    const { data } = await axiosClient.get(`transactions`, {
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
