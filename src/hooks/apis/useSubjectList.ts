import { useMutation, useQuery } from "react-query";
import requestManager from "@/configs/requestManager";

export const useGetSubjectList = () => {
  return useQuery("subject-list", getSubjectList);
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
