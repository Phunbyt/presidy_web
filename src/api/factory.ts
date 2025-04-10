import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res.status == 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { axiosClient };
