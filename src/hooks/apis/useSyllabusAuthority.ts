import { useMutation, useQuery } from "react-query";
import requestManager from "@/configs/requestManager";
import { TSyllabusAuthorityData } from "@/types/syllabusAuthority";

export const useGetSyllabusAuthority = () => {
  return useQuery("syllabus-authority", getSyllabusAuthority);
};

export const useAddSyllabusAuthority = () => {
  return useMutation((data: TSyllabusAuthorityData) => {
    return addSyllabusAuthority(data);
  });
};

// services
const getSyllabusAuthority = () => {
  return requestManager.get("/SyllabusAuthority/GetBySearch");
};

const addSyllabusAuthority = (data: TSyllabusAuthorityData) => {
  return requestManager.post("/SyllabusAuthority/Save", data);
};
