import { columns } from "./columns";
import { AntTable } from "@/components";
import { TSubjectCategoryData } from "@/types/subjectCategory";

function SubjectCategory({ data, isError, isLoading }: TSubjectCategory) {
  return (
    <div>
      <AntTable
        data={data}
        columns={columns}
        isError={isError}
        isLoading={isLoading}
        numberOfSkeletons={6}
        tableTitle="Subject Category"
        rowKey={(record: any) => record?.subjectCategoryId}
      />
    </div>
  );
}

type TSubjectCategory = {
  data: Array<TSubjectCategoryData>;
  isError: boolean;
  isLoading: boolean;
};

export default SubjectCategory;
