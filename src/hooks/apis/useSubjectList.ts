import { isNumber } from "lodash";
import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TSubjectListFormDataOnAdd, TSubjectListFormDataOnUpdate } from "@/types/subjectList";

export const useGetSubjectLists = () => useQuery("subject-list", getSubjectList);

export const useGetSubjectListById = (SubjectListId?: number | null) => {
  return useQuery(
    ["subject", SubjectListId],
    () => {
      return getSubjectListById(SubjectListId);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || "Something went wrong";
        notification.error({ description: "", message: msg as string });
      },
    }
  );
};

export const useAddUpdateSubjectList = (subjectListId?: number | null) => {
  return useMutation(
    (data: TSubjectListFormDataOnAdd | TSubjectListFormDataOnUpdate) => {
      return addUpdateSubjectList(data, subjectListId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subject-list");
        const msg = subjectListId ? "Record updated successfully!" : "Record added successfully!";
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
const getSubjectList = () => {
  const appUser = JSON.parse(localStorage.getItem("app-user") || "{}");

  return requestManager.get("/SubjectList/GetBySearch", {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

const getSubjectListById = (SubjectListId?: number | null) => {
  return requestManager.get("/SubjectList/GetById", { params: { SubjectListId } });
};

const addUpdateSubjectList = (
  data: TSubjectListFormDataOnAdd | TSubjectListFormDataOnUpdate,
  subjectListId?: number | null
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem("app-user") || "{}");

  let dataToSubmit = {};

  if (isNumber(subjectListId)) {
    dataToSubmit = {
      campusId: appUser?.campusId,
      subjectListId: subjectListId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      subjectListId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post("/SubjectList/Save", dataToSubmit);
};
