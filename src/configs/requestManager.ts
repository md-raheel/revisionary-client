import axios, { AxiosError, AxiosRequestConfig } from "axios";

const apiURL = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN = localStorage.getItem("auth");

const logoutRedirect = (error: AxiosError) => {
  localStorage.removeItem("auth");

  window.location.href = window.location.origin + "/";
  return Promise.reject(error);
};

const requestManager = axios.create({
  baseURL: apiURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// Adds request interceptor
requestManager.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (ACCESS_TOKEN) {
      (config.headers as any)["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error: any): Promise<any> => {
    return Promise.reject(error);
  }
);

//Adds response interceptor
requestManager.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config;

    if ([401, 402].includes(error.response.status) && originalRequest.url !== "/api/token") {
      logoutRedirect(error);
    }

    return Promise.reject(error);
  }
);

export default requestManager;
