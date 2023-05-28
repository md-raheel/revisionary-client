import { isNumber } from "lodash";
import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TClassDivisionFormDataOnAdd, TClassDivisionFormDataOnUpdate } from "@/types/classDivision";

export const useGetClassDivisions = () => useQuery("class-divisions", getClassDivision);

export const useGetClassDivisionById = (ClassSubDivisionId?: number) => {
  return useQuery(
    ["class-division", ClassSubDivisionId],
    () => {
      return getClassDivisionId(ClassSubDivisionId);
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

export const useAddUpdateClassDivision = (classSubDivisionId?: number) => {
  return useMutation(
    (data: TClassDivisionFormDataOnAdd | TClassDivisionFormDataOnUpdate) => {
      return addUpdateClassDivision(data, classSubDivisionId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("class-divisions");
        const msg = classSubDivisionId ? "Record updated successfully!" : "Record added successfully!";
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
const getClassDivisionId = (ClassSubDivisionId?: number) => {
  return requestManager.get("/ClassSubDivision/GetById", { params: { ClassSubDivisionId } });
};

const getClassDivision = () => {
  const appUser = JSON.parse(localStorage.getItem("app-user") || "{}");

  return requestManager.get("/ClassSubDivision/GetBySearch", {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

const addUpdateClassDivision = (
  data: TClassDivisionFormDataOnAdd | TClassDivisionFormDataOnUpdate,
  classSubDivisionId?: number
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem("app-user") || "{}");

  let dataToSubmit = {};

  if (isNumber(classSubDivisionId)) {
    dataToSubmit = {
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      classSubDivisionId: classSubDivisionId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      classSubDivisionId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post("/ClassSubDivision/Save", dataToSubmit);
};
