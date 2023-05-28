import { isNumber } from "lodash";
import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TClassFormDataOnAdd, TClassFormDataOnUpdate } from "@/types/classes";

export const useGetClass = () => useQuery("class", getClass);

export const useGetClassById = (ClassId?: number) => {
  return useQuery(
    ["class", ClassId],
    () => {
      return getClassById(ClassId);
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

export const useAddUpdateClass = (classId?: number) => {
  return useMutation(
    (data: TClassFormDataOnAdd | TClassFormDataOnUpdate) => {
      return addUpdateClass(data, classId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("class");
        const msg = classId ? "Record updated successfully!" : "Record added successfully!";
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
const getClass = () => {
  const appUser = JSON.parse(localStorage.getItem("app-user") || "{}");

  return requestManager.get("/Class/GetBySearch", {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

const getClassById = (ClassId?: number) => {
  return requestManager.get("/Class/GetById", { params: { ClassId } });
};

const addUpdateClass = (data: TClassFormDataOnAdd | TClassFormDataOnUpdate, classId?: number) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem("app-user") || "{}");

  let dataToSubmit = {};

  if (isNumber(classId)) {
    dataToSubmit = {
      classId: classId,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      classId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post("/Class/Save", dataToSubmit);
};
