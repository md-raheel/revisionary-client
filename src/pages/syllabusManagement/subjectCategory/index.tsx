import { Col, Row } from "antd";
import { useState } from "react";
import { columns } from "./columns";
import AddRecord from "./AddRecord";
import { AntButton, AntTable } from "@/components";
import { TSubjectCategoryData } from "@/types/subjectCategory";

function SubjectCategory({ data, isError, isLoading }: TSubjectCategory) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AntTable
        data={data}
        columns={columns}
        isError={isError}
        isLoading={isLoading}
        numberOfSkeletons={6}
        tableTitle={
          <Row align="middle" justify="space-between">
            <Col>
              <h3>Subject Category</h3>
            </Col>
            <Col>
              <AntButton ghost label="Add" onClick={handleOpen} />
            </Col>
          </Row>
        }
        rowKey={(record: any) => record?.subjectCategoryId}
      />

      <AddRecord open={open} handleClose={handleClose} />
    </div>
  );
}

type TSubjectCategory = {
  data: Array<TSubjectCategoryData>;
  isError: boolean;
  isLoading: boolean;
};

export default SubjectCategory;
