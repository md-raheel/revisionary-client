import { AntButton } from "@/components";
import { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row } from "antd";
import { useAddSubjectCategory } from "@/hooks/apis/useSubjectCategory";
import { TSubjectCategoryFormDataOnAdd } from "@/types/subjectCategory";

function AddRecord({ open, handleClose }: TAddRecord) {
  const [form] = Form.useForm();
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddSubjectCategory();

  const onFinish = (values: TSubjectCategoryFormDataOnAdd) => mutate(values);

  useEffect(() => {
    if (isSuccess) {
      if (btnClicked) form.resetFields();
      else handleClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={open}
      footer={null}
      onOk={handleClose}
      maskClosable={false}
      onCancel={handleClose}
      title="Subject Category"
    >
      <Form form={form} onFinish={onFinish} initialValues={{ remember: true }}>
        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={8}>
            <Form.Item
              name="subjectCategoryCode"
              rules={[
                {
                  required: true,
                  message: "Please input your Code!",
                },
              ]}
            >
              <Input size="large" placeholder="Code" />
            </Form.Item>
          </Col>

          <Col xs={16}>
            <Form.Item
              name="subjectCategoryDescription"
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                },
              ]}
            >
              <Input size="large" placeholder="Description" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row gutter={6} justify="end">
            <Col>
              <AntButton
                label="Cancel"
                type="default"
                htmlType="reset"
                onClick={handleClose}
              />
            </Col>

            <Col>
              <AntButton label="Save" htmlType="submit" disabled={isLoading} />
            </Col>

            <Col>
              <AntButton
                htmlType="submit"
                disabled={isLoading}
                label="Save and Add more"
                onClick={() => setBtnClicked(true)}
              />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}

type TAddRecord = { open: boolean; handleClose: VoidFunction };

export default AddRecord;
