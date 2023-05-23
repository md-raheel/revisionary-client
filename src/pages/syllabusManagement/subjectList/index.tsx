import { Card } from "antd";
import { useState } from "react";
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
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  return (
    <Card title={<h1 style={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}>Subject List</h1>}>
      <SubjectListForm
        classList={classList}
        selectedRecordId={selectedRecordId}
        isClassListLoading={isClassListLoading}
        setSelectedRecordId={setSelectedRecordId}
        subjectCategoryList={subjectCategoryList}
        syllabusAuthorityList={syllabusAuthorityList}
        isSubjectCategoryListLoading={isSubjectCategoryListLoading}
        isSyllabusAuthorityListLoading={isSyllabusAuthorityListLoading}
      />

      <AntTable
        isError={isError}
        isLoading={isLoading}
        numberOfSkeletons={8}
        data={data?.data?.apiData || []}
        columns={columns(setSelectedRecordId)}
        pagination={{ showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }}
      />
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
