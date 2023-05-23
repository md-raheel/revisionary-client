import { Col, Row } from "antd";
import Classes from "./classes";
import ClassSyllabus from "./classSyllabus";
import ClassDivision from "./classesDivision";
import { useGetClass } from "@/hooks/apis/useClass";
import { useGetClassDivision } from "@/hooks/apis/useClassDivision";

function ClassManagement() {
  const { data, isError, isLoading } = useGetClass();
  const {
    data: classDivisionData,
    isError: isClassDivisionError,
    isLoading: isClassDivisionLoading,
  } = useGetClassDivision();

  return (
    <Row gutter={15}>
      <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
        <Classes isError={isError} isLoading={isLoading} data={data?.data?.apiData || []} />
        <br />
        <ClassDivision
          isError={isClassDivisionError}
          isLoading={isClassDivisionLoading}
          data={classDivisionData?.data?.apiData || []}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
        <ClassSyllabus />
      </Col>
    </Row>
  );
}

export default ClassManagement;
