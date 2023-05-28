import { useState } from "react";
import { columns } from "./columns";
import { Col, Form, Row } from "antd";
import { TClassData } from "@/types/classes";
import AddUpdateRecord from "./AddUpdateRecord";
import { AntButton, AntTable } from "@/components";
import { TClassDivisionData } from "@/types/classDivision";

function ClassDivision({ data, isError, isLoading, classData, isClassLoading }: TClassDivision) {
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
              <h3>Class Division</h3>
            </Col>
            <Col>
              <AntButton ghost label="Add" onClick={() => handleOpen()} />
            </Col>
          </Row>
        }
        rowKey={(record: any) => record?.classSubDivisionId}
      />

      <AddUpdateRecord
        open={open}
        form={form}
        classData={classData}
        handleClose={handleClose}
        isClassLoading={isClassLoading}
        selectedRecordId={selectedRecordId}
      />
    </div>
  );
}

type TClassDivision = {
  isError: boolean;
  isLoading: boolean;
  isClassLoading: boolean;
  classData: Array<TClassData>;
  data: Array<TClassDivisionData>;
};

export default ClassDivision;
