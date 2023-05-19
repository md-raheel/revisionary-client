import { isNumber } from "lodash";
import { useEffect, useState } from "react";
import { AntButton, TableLoader } from "@/components";
import { Col, Form, FormInstance, Input, Modal, Row } from "antd";
import { useGetSyllabusAuthorityById, useAddUpdateSyllabusAuthority } from "@/hooks/apis/useSyllabusAuthority";
import { TSyllabusAuthorityFormDataOnAdd, TSyllabusAuthorityFormDataOnUpdate } from "@/types/syllabusAuthority";

function AddUpdateRecord({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddUpdateSyllabusAuthority(selectedRecordId);
  const {
    data,
    refetch,
    isStale,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetSyllabusAuthorityById(selectedRecordId);

  const onFinish = (values: TSyllabusAuthorityFormDataOnAdd | TSyllabusAuthorityFormDataOnUpdate) => {
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (btnClicked) form.resetFields();
      else handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(data?.data?.apiData);
    }
  }, [isDataSuccess, isStale]);

  return (
    <Modal
      open={open}
      footer={null}
      onOk={handleClose}
      maskClosable={false}
      onCancel={handleClose}
      title="Syllabus Authority / Publisher"
    >
      {isDataLoading || isFetching ? (
        <TableLoader numberOfSkeletons={3} />
      ) : (
        <Form form={form} onFinish={onFinish} initialValues={{ remember: true }}>
          <Row gutter={10} style={{ marginTop: 20 }}>
            <Col xs={8}>
              <Form.Item
                name="syllabusAuthorityCode"
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
                name="syllabusAuthorityName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input size="large" placeholder="Name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row gutter={6} justify="end">
              <Col>
                <AntButton label="Cancel" type="default" htmlType="reset" onClick={handleClose} />
              </Col>

              {isNumber(selectedRecordId) ? (
                <Col>
                  <AntButton label="Update" htmlType="submit" disabled={isLoading} />
                </Col>
              ) : (
                <>
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
                </>
              )}
            </Row>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

type TAddUpdateRecord = {
  open: boolean;
  form: FormInstance<any>;
  handleClose: VoidFunction;
  selectedRecordId?: number;
};

export default AddUpdateRecord;
