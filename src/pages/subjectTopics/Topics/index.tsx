import { useState } from "react";
import { columns } from "./columns";
import { Col, Form, Row } from "antd";
import { TTopicsData } from "@/types/topics";
import { AntButton, AntTable } from "@/components";

function Topics({ data, isError, isLoading }: TTopics) {
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
              <h3>Topics</h3>
            </Col>
            <Col>
              <AntButton ghost label="Add" onClick={() => handleOpen()} />
            </Col>
          </Row>
        }
        rowKey={(record: any) => record?.unitTopicId}
      />
    </div>
  );
}

type TTopics = {
  isError: boolean;
  isLoading: boolean;
  data: Array<TTopicsData>;
};

export default Topics;
