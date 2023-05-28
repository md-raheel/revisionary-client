import { isNumber } from "lodash";
import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TSyllabusAuthorityFormDataOnAdd, TSyllabusAuthorityFormDataOnUpdate } from "@/types/syllabusAuthority";

export const useGetSyllabusAuthority = () => useQuery("syllabus-authorities", getSyllabusAuthority);

export const useGetSyllabusAuthorityById = (SyllabusAuthorityId?: number) => {
  return useQuery(
    ["syllabus-authority", SyllabusAuthorityId],
    () => {
      return getSyllabusAuthorityById(SyllabusAuthorityId);
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

export const useAddUpdateSyllabusAuthority = (syllabusAuthorityId?: number) => {
  return useMutation(
    (data: TSyllabusAuthorityFormDataOnAdd | TSyllabusAuthorityFormDataOnUpdate) => {
      return addUpdateSyllabusAuthority(data, syllabusAuthorityId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("syllabus-authorities");
        const msg = syllabusAuthorityId ? "Record updated successfully!" : "Record added successfully!";
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
const getSyllabusAuthority = () => requestManager.get("/SyllabusAuthority/GetBySearch");

const getSyllabusAuthorityById = (SyllabusAuthorityId?: number) => {
  return requestManager.get("/SyllabusAuthority/GetById", { params: { SyllabusAuthorityId } });
};

const addUpdateSyllabusAuthority = (
  data: TSyllabusAuthorityFormDataOnAdd | TSyllabusAuthorityFormDataOnUpdate,
  syllabusAuthorityId?: number
) => {
  const appUser: TAppUserData = JSON.parse(localStorage.getItem("app-user") || "{}");

  let dataToSubmit = {};

  if (isNumber(syllabusAuthorityId)) {
    dataToSubmit = {
      appUserLogId: appUser?.appUserLogId,
      syllabusAuthorityId: syllabusAuthorityId,
      lastModifiedUserId: appUser?.lastModifiedUserId,
      ...data,
    };
  } else {
    dataToSubmit = {
      syllabusAuthorityId: 0,
      appUserLogId: appUser?.appUserLogId,
      createdUserId: appUser?.createdUserId,
      ...data,
    };
  }

  return requestManager.post("/SyllabusAuthority/Save", dataToSubmit);
};
