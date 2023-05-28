import { useState } from "react";
import { columns } from "./columns";
import { Col, Form, Row } from "antd";
import { TTopicsData } from "@/types/topics";
import AddUpdateRecord from "./AddUpdateRecord";
import { TSubTopicsData } from "@/types/subTopics";
import { AntButton, AntTable } from "@/components";

function SubTopics({ data, isError, isLoading, topicsData, isTopicsLoading }: TSubTopics) {
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
              <h3>Sub-Topics</h3>
            </Col>
            <Col>
              <AntButton ghost label="Add" onClick={() => handleOpen()} />
            </Col>
          </Row>
        }
        rowKey={(record: any) => record?.subTopicId}
      />

      <AddUpdateRecord
        open={open}
        form={form}
        topicsData={topicsData}
        handleClose={handleClose}
        isTopicsLoading={isTopicsLoading}
        selectedRecordId={selectedRecordId}
      />
    </div>
  );
}

type TSubTopics = {
  isError: boolean;
  isLoading: boolean;
  isTopicsLoading: boolean;
  data: Array<TSubTopicsData>;
  topicsData: Array<TTopicsData>;
};

export default SubTopics;
