import { Col, Row } from "antd";
import Classes from "./classes";
import ClassSyllabus from "./classSyllabus";
import ClassDivision from "./classesDivision";
import { useGetClasses } from "@/hooks/apis/useClass";
import { useGetClassDivisions } from "@/hooks/apis/useClassDivision";

function ClassManagement() {
  const { data, isError, isLoading } = useGetClasses();
  const {
    data: classDivisionData,
    isError: isClassDivisionError,
    isLoading: isClassDivisionLoading,
  } = useGetClassDivisions();

  return (
    <Row gutter={15}>
      <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
        <Classes isError={isError} isLoading={isLoading} data={data?.data?.apiData || []} />
        <br />
        <ClassDivision
          isClassLoading={isLoading}
          isError={isClassDivisionError}
          isLoading={isClassDivisionLoading}
          classData={data?.data?.apiData || []}
          data={classDivisionData?.data?.apiData || []}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
        <ClassSyllabus isError={isError} isLoading={isLoading} data={data?.data?.apiData || []} />
      </Col>
    </Row>
  );
}

export default ClassManagement;
