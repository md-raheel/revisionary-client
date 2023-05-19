import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TSubjectListFormDataOnAdd } from "@/types/subjectList";

export const useGetSubjectList = () => useQuery("subject-list", getSubjectList);

export const useAddSubjectList = () => {
  return useMutation((data: TSubjectListFormDataOnAdd) => addSubjectList(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("subject-list");
    },
    onError: (error: AxiosError) => {
      const msg = error.response?.data || "Something went wrong";
      notification.error({ description: "", message: msg as string });
    },
  });
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

const addSubjectList = (data: TSubjectListFormDataOnAdd) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem("app-user") || "{}");

  const dataToSubmit = {
    subjectListId: 0,
    campusId: appUser?.campusId,
    instituteId: appUser?.instituteId,
    appUserLogId: appUser?.appUserLogId,
    createdUserId: appUser?.createdUserId,
    organizationId: appUser?.organizationId,
    ...data,
  };

  return requestManager.post("/SubjectList/Save", dataToSubmit);
};
