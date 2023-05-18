export type TSyllabusAuthorityData = {
  createdUser: string;
  createdOn: string | Date;
  syllabusAuthorityId: number;
  syllabusAuthorityCode: string;
  syllabusAuthorityName: string;
};

export type TSyllabusAuthorityFormDataOnAdd = {
  syllabusAuthorityCode: number;
  syllabusAuthorityName: number;
};

export type TSyllabusAuthorityFormDataOnUpdate = {
  rowVersion: number;
  appUserLogId: number;
  createdUserId: number;
  lastModifiedUserId: number;
  syllabusAuthorityId: number;
  syllabusAuthorityCode: number;
  syllabusAuthorityName: number;
};
