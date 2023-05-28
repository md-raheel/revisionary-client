import { isNumber } from "lodash";
import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TTopicFormDataOnAdd, TTopicFormDataOnUpdate } from "@/types/topics";

export const useGetTopics = () => useQuery("topics", getTopics);

export const useGetTopicById = (UnitTopicId?: number) => {
  return useQuery(
    ["topic", UnitTopicId],
    () => {
      return getTopicById(UnitTopicId);
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

export const useAddUpdateTopic = (unitTopicId?: number) => {
  return useMutation(
    (data: TTopicFormDataOnAdd | TTopicFormDataOnUpdate) => {
      return addUpdateTopic(data, unitTopicId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("topics");
        const msg = unitTopicId ? "Record updated successfully!" : "Record added successfully!";
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
const getTopics = () => {
  const appUser = JSON.parse(localStorage.getItem("app-user") || "{}");

  return requestManager.get("/UnitTopic/GetBySearch", {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};

const getTopicById = (UnitTopicId?: number) => {
  return requestManager.get("/UnitTopic/GetById", { params: { UnitTopicId } });
};

const addUpdateTopic = (data: TTopicFormDataOnAdd | TTopicFormDataOnUpdate, unitTopicId?: number) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem("app-user") || "{}");

  let dataToSubmit = {};

  if (isNumber(unitTopicId)) {
    dataToSubmit = {
      unitTopicId: unitTopicId,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      organizationId: appUser?.organizationId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      unitTopicId: 0,
      campusId: appUser?.campusId,
      instituteId: appUser?.instituteId,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      organizationId: appUser?.organizationId,
      ...data,
    };
  }

  return requestManager.post("/UnitTopic/Save", dataToSubmit);
};
