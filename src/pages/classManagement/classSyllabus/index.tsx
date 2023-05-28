import { map } from "lodash";
import { TableLoader } from "@/components";
// import { useEffect, useState } from "react";
import { TClassData } from "@/types/classes";
import { Card, Collapse, Result, Row, Spin, Typography } from "antd";
// import { useGetSyllabusAuthoritiesByClassId } from "@/hooks/apis/useSyllabusAuthority";

const { Panel } = Collapse;
const { Text } = Typography;

function ClassSyllabus({ data, isError, isLoading }: TClassSyllabus) {
  // const [classId, setClassId] = useState<any>();
  // const {
  //   refetch,
  //   data: syllabusAuthorityData,
  //   isError: isSyllabusAuthorityError,
  //   isLoading: isSyllabusAuthorityLoading,
  // } = useGetSyllabusAuthoritiesByClassId(classId);

  const handleCollapseChange = (key: string | string[]) => {
    // setClassId(key[0]);
  };

  // useEffect(() => {
  //   if (classId) refetch();
  // }, [classId]);

  if (isError) return <Result title="" status="500" subTitle="Sorry, something went wrong" />;

  return (
    <Card title={<h1 style={{ fontWeight: "bold", fontSize: 24, textAlign: "center" }}>Class Syllabus</h1>}>
      {isLoading ? (
        <TableLoader numberOfSkeletons={6} />
      ) : (
        map(data, ({ classId, className }) => (
          <Collapse
            key={classId}
            expandIconPosition="end"
            onChange={handleCollapseChange}
            style={{ marginBottom: 10, border: "1px solid #00b761", borderRadius: 2 }}
          >
            <Panel
              key={classId}
              header={className}
              style={{ fontWeight: "bold", border: "none", backgroundColor: "#f4fff9" }}
            >
              {/* <Row justify="center" style={{ fontWeight: "normal" }}>
                {isSyllabusAuthorityError ? (
                  <Result title="" subTitle="Sorry, something went wrong" />
                ) : isSyllabusAuthorityLoading ? (
                  <Spin />
                ) : null}
              </Row> */}

              <Text type="success">In progress</Text>
            </Panel>
          </Collapse>
        ))
      )}
    </Card>
  );
}

type TClassSyllabus = { isError: boolean; isLoading: boolean; data: Array<TClassData> };

export default ClassSyllabus;
