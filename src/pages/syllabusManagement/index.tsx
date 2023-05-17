import { Col, Row } from "antd";
import SubjectList from "./subjectList";
import SubjectCategory from "./subjectCategory";
import SyllabusAuthority from "./syllabusAuthority";
import { useGetClass } from "@/hooks/apis/useClass";
import { useGetSubjectCategory } from "@/hooks/apis/useSubjectCategory";
import { useGetSyllabusAuthority } from "@/hooks/apis/useSyllabusAuthority";

function SyllabusManagement() {
  const { data, isError, isLoading } = useGetSyllabusAuthority();
  const {
    data: subjData,
    isError: subjError,
    isLoading: subjLoading,
  } = useGetSubjectCategory();

  const { data: classData, isLoading: classLoading } = useGetClass();

  return (
    <Row gutter={15}>
      <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
        <SyllabusAuthority
          isError={isError}
          isLoading={isLoading}
          data={data?.data?.apiData || []}
        />
        <br />
        <SubjectCategory
          isError={subjError}
          isLoading={subjLoading}
          data={subjData?.data?.apiData || []}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
        <SubjectList
          isClassListLoading={classLoading}
          classList={classData?.data?.apiData || []}
          isSubjectCategoryListLoading={subjLoading}
          isSyllabusAuthorityListLoading={isLoading}
          syllabusAuthorityList={data?.data?.apiData || []}
          subjectCategoryList={subjData?.data?.apiData || []}
        />
      </Col>
    </Row>
  );
}

export default SyllabusManagement;
