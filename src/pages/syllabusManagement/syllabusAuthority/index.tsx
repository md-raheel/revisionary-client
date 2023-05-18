import { Col, Row } from "antd";
import { useState } from "react";
import { columns } from "./columns";
import AddRecord from "./AddRecord";
import { AntButton, AntTable } from "@/components";
import { TSyllabusAuthorityData } from "@/types/syllabusAuthority";

function SyllabusAuthority({ data, isError, isLoading }: TSyllabusAuthority) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AntTable
        data={data}
        isError={isError}
        columns={columns}
        isLoading={isLoading}
        numberOfSkeletons={6}
        tableTitle={
          <Row align="middle" justify="space-between">
            <Col>
              <h3>Syllabus Authority / Publisher</h3>
            </Col>
            <Col>
              <AntButton ghost label="Add" onClick={handleOpen} />
            </Col>
          </Row>
        }
        rowKey={(record: any) => record?.syllabusAuthorityId}
      />

      <AddRecord open={open} handleClose={handleClose} />
    </div>
  );
}

type TSyllabusAuthority = {
  isError: boolean;
  isLoading: boolean;
  data: Array<TSyllabusAuthorityData>;
};

export default SyllabusAuthority;
