import { useState } from "react";
import { columns } from "./columns";
import { Col, Form, Row } from "antd";
import AddUpdateRecord from "./AddUpdateRecord";
import { AntButton, AntTable } from "@/components";
import { TSyllabusAuthorityData } from "@/types/syllabusAuthority";

function SyllabusAuthority({ data, isError, isLoading }: TSyllabusAuthority) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  const handleOpen = (id?: number) => {
    setOpen(true);
    setSelectedRecordId(id);
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setSelectedRecordId(undefined);
  };

  return (
    <div>
      <AntTable
        data={data}
        isError={isError}
        isLoading={isLoading}
        numberOfSkeletons={6}
        columns={columns(handleOpen)}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50, 100] }}
        tableTitle={
          <Row align="middle" justify="space-between">
            <Col>
              <h3>Syllabus Authority / Publisher</h3>
            </Col>
            <Col>
              <AntButton ghost label="Add" onClick={() => handleOpen()} />
            </Col>
          </Row>
        }
        rowKey={(record: any) => record?.syllabusAuthorityId}
      />

      <AddUpdateRecord open={open} form={form} handleClose={handleClose} selectedRecordId={selectedRecordId} />
    </div>
  );
}

type TSyllabusAuthority = {
  isError: boolean;
  isLoading: boolean;
  data: Array<TSyllabusAuthorityData>;
};

export default SyllabusAuthority;
