import { useState } from "react";
import { columns } from "./columns";
import { Col, Form, Row } from "antd";
import { AntButton, AntTable } from "@/components";
import { TClassDivisionData } from "@/types/classDivision";

function ClassDivision({ data, isError, isLoading }: TClassDivision) {
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
        columns={[]}
        tableTitle={
          <Row align="middle" justify="space-between">
            <Col>
              <h3>Class Division</h3>
            </Col>
            <Col>
              <AntButton ghost label="Add" onClick={() => handleOpen()} />
            </Col>
          </Row>
        }
        rowKey={(record: any) => record?.classId}
      />
    </div>
  );
}

type TClassDivision = {
  isError: boolean;
  isLoading: boolean;
  data: Array<TClassDivisionData>;
};

export default ClassDivision;
