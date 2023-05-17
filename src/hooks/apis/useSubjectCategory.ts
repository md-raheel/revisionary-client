import { useMutation, useQuery } from "react-query";
import requestManager from "@/configs/requestManager";
import { TSubjectCategoryData } from "@/types/subjectCategory";

export const useGetSubjectCategory = () => {
  return useQuery("subject-category", getSubjectCategory);
};

export const useAddSubjectCategory = () => {
  return useMutation((data: TSubjectCategoryData) => addSubjectCategory(data));
};

// services
const getSubjectCategory = () => {
  return requestManager.get("/SubjectCategory/GetBySearch");
};

const addSubjectCategory = (data: TSubjectCategoryData) => {
  return requestManager.post("/SubjectCategory/Save", data);
};
