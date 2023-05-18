import { AxiosError } from "axios";
import { notification } from "antd";
import { TAppUserData } from "@/types/user";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "@/configs/queryClient";
import requestManager from "@/configs/requestManager";
import { TSyllabusAuthorityFormDataOnAdd } from "@/types/syllabusAuthority";

export const useGetSyllabusAuthority = () => {
  return useQuery("syllabus-authority", getSyllabusAuthority);
};

export const useAddSyllabusAuthority = () => {
  return useMutation(
    (data: TSyllabusAuthorityFormDataOnAdd) => {
      return addSyllabusAuthority(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("syllabus-authority");
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
const getSyllabusAuthority = () => {
  return requestManager.get("/SyllabusAuthority/GetBySearch");
};

const addSyllabusAuthority = (data: TSyllabusAuthorityFormDataOnAdd) => {
  const appUser: TAppUserData = JSON.parse(
    localStorage.getItem("app-user") || "{}"
  );

  const dataToSubmit = {
    syllabusAuthorityId: 0,
    appUserLogId: appUser?.appUserLogId,
    createdUserId: appUser?.createdUserId,
    ...data,
  };

  return requestManager.post("/SyllabusAuthority/Save", dataToSubmit);
};
