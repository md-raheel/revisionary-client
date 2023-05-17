import { Card } from "antd";
import { columns } from "./columns";
import SubjectListForm from "./Form";
import { AntTable } from "@/components";
import { useGetSubjectList } from "@/hooks/apis/useSubjectList";

function SubjectList({
  classList,
  isClassListLoading,
  subjectCategoryList,
  syllabusAuthorityList,
  isSubjectCategoryListLoading,
  isSyllabusAuthorityListLoading,
}: TSubjectList) {
  const { data, isError, isLoading } = useGetSubjectList();

  return (
    <Card
      title={
        <h1 style={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}>
          Subject List
        </h1>
      }
    >
      <SubjectListForm
        classList={classList}
        isClassListLoading={isClassListLoading}
        subjectCategoryList={subjectCategoryList}
        syllabusAuthorityList={syllabusAuthorityList}
        isSubjectCategoryListLoading={isSubjectCategoryListLoading}
        isSyllabusAuthorityListLoading={isSyllabusAuthorityListLoading}
      />

      <div style={{ marginTop: 15 }}>
        <AntTable
          isError={isError}
          columns={columns}
          numberOfSkeletons={6}
          isLoading={isLoading}
          data={data?.data?.apiData || []}
        />
      </div>
    </Card>
  );
}

type TSubjectList = {
  isClassListLoading: boolean;
  isSubjectCategoryListLoading: boolean;
  isSyllabusAuthorityListLoading: boolean;
  classList: Array<{ [key: string]: string }>;
  subjectCategoryList: Array<{ [key: string]: string }>;
  syllabusAuthorityList: Array<{ [key: string]: string }>;
};

export default SubjectList;
