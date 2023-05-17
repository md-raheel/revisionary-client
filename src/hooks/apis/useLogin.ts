import { notification } from "antd";
import { TUser } from "@/types/user";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

export default function useLogin() {
  return useMutation((data: TUser) => loginService(data), {
    onError: (error: AxiosError) => {
      notification.error({
        message: `${error.response?.data}`,
        description: "",
      });
    },
    onSuccess: (response) => {
      localStorage.setItem("auth", response?.data);
      window.location.href = window.location.origin + "/syllabus-management";
    },
  });
}

const apiURL = import.meta.env.VITE_API_URL;

const loginService = (data: TUser) => axios.post(`${apiURL}/api/token`, data);
