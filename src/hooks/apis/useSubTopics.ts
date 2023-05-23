import { useMutation, useQuery } from "react-query";
import requestManager from "@/configs/requestManager";

export const useGetSubTopics = () => useQuery("sub-topics", getSubTopics);

// services
const getSubTopics = () => {
  const appUser = JSON.parse(localStorage.getItem("app-user") || "{}");

  return requestManager.get("/SubTopic/GetBySearch", {
    params: {
      CampusId: appUser?.campusId,
      InstituteId: appUser?.instituteId,
      OrganizationId: appUser?.organizationId,
    },
  });
};
