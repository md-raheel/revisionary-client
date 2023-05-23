import { useMutation, useQuery } from "react-query";
import requestManager from "@/configs/requestManager";

export const useGetClassDivision = () => useQuery("class-division", getClassDivision);

// services
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
