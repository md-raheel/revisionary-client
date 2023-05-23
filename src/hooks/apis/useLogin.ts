import { notification } from "antd";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { TAppUserFormData, TUser } from "@/types/user";

export default function useLogin() {
  return useMutation((data: TUser) => getAccessToken(data), {
    onError: (error: AxiosError) => {
      const msg = error.response?.data || "Something went wrong";
      notification.error({ description: "", message: msg as string });
    },
    onSuccess: (response, data: TUser) => {
      localStorage.setItem("auth", response?.data);

      getUser(response?.data, { LoginId: data?.username, LoginPassword: data?.password })
        .then((response) => {
          localStorage.setItem("app-user", JSON.stringify(response?.data?.apiData));
        })
        .catch((error) => console.log(error));
    },
  });
}

const apiURL = import.meta.env.VITE_API_URL;

const getAccessToken = (data: TUser) => axios.post(`${apiURL}/api/token`, data);
const getUser = (token: string, data: TAppUserFormData) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get(`${apiURL}/AppUser/Login`, { params: { ...data }, headers });
};
