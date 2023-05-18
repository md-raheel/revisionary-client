import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TSubjectCategoryFormDataOnAdd } from "@/types/subjectCategory";

export const useGetSubjectCategory = () => {
  return useQuery("subject-category", getSubjectCategory);
};

export const useAddSubjectCategory = () => {
  return useMutation(
    (data: TSubjectCategoryFormDataOnAdd) => {
      return addSubjectCategory(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subject-category");
      },

      onError: (error: AxiosError) => {
        const msg = error.response?.data || "Something went wrong";
        notification.error({
          description: "",
          message: msg as string,
        });
      },
    }
  );
};

// services
const getSubjectCategory = () => {
  return requestManager.get("/SubjectCategory/GetBySearch");
};

const addSubjectCategory = (data: TSubjectCategoryFormDataOnAdd) => {
  const appUser: TAppUserData = JSON.parse(
    localStorage.getItem("app-user") || "{}"
  );

  const dataToSubmit = {
    subjectCategoryId: 0,
    appUserLogId: appUser?.appUserLogId,
    createdUserId: appUser?.createdUserId,
    ...data,
  };

  return requestManager.post("/SubjectCategory/Save", dataToSubmit);
};
