import { useMutation, useQuery } from "react-query";
import requestManager from "@/configs/requestManager";

export const useGetClass = () => {
  return useQuery("class", getClass);
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
