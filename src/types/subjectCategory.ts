export type TSubjectCategoryData = {
  createdUser: string;
  createdOn: string | Date;
  subjectCategoryId: number;
  subjectCategoryCode: string;
  subjectCategoryDescription: string;
};

export type TSubjectCategoryFormDataOnAdd = {
  subjectCategoryCode: number;
  subjectCategoryDescription: number;
};

export type TSubjectCategoryFormDataOnUpdate = {
  rowVersion: number;
  subjectCategoryId: number;
  subjectCategoryCode: number;
  subjectCategoryDescription: number;
};
