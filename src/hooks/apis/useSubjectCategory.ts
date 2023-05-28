import { isNumber } from "lodash";
import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TSubjectCategoryFormDataOnAdd, TSubjectCategoryFormDataOnUpdate } from "@/types/subjectCategory";

export const useGetSubjectCategory = () => useQuery("subject-categories", getSubjectCategory);

export const useGetSubjectCategoryById = (SubjectCategoryId?: number) => {
  return useQuery(
    ["subject-category", SubjectCategoryId],
    () => {
      return getSubjectCategoryById(SubjectCategoryId);
    },
    {
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || "Something went wrong";
        notification.error({ description: "", message: msg as string });
      },
    }
  );
};

export const useAddUpdateSubjectCategory = (subjectCategoryId?: number) => {
  return useMutation(
    (data: TSubjectCategoryFormDataOnAdd | TSubjectCategoryFormDataOnUpdate) => {
      return addUpdateSubjectCategory(data, subjectCategoryId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subject-categories");
        const msg = subjectCategoryId ? "Record updated successfully!" : "Record added successfully!";
        notification.success({ description: "", message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || "Something went wrong";
        notification.error({ description: "", message: msg as string });
      },
    }
  );
};

// services
const getSubjectCategory = () => requestManager.get("/SubjectCategory/GetBySearch");

const getSubjectCategoryById = (SubjectCategoryId?: number) => {
  return requestManager.get("/SubjectCategory/GetById", { params: { SubjectCategoryId } });
};

const addUpdateSubjectCategory = (
  data: TSubjectCategoryFormDataOnAdd | TSubjectCategoryFormDataOnUpdate,
  subjectCategoryId?: number
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem("app-user") || "{}");

  let dataToSubmit = {};

  if (isNumber(subjectCategoryId)) {
    dataToSubmit = {
      appUserLogId: appUser?.appUserLogId,
      subjectCategoryId: subjectCategoryId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      subjectCategoryId: 0,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      ...data,
    };
  }

  return requestManager.post("/SubjectCategory/Save", dataToSubmit);
};
