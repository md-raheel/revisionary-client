import { isNumber } from "lodash";
import { ReactNode } from "react";
import { AntButton, TableLoader } from "@/components";
import { Col, Form, FormInstance, Modal, Row } from "antd";

function LookupFormModal({
  open,
  form,
  onFinish,
  children,
  isLoading,
  isFetching,
  handleClose,
  isDataLoading,
  selectedRecordId,
  handleSaveMoreClick,
}: TLookupFormModal) {
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
          {children}

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
                      onClick={handleSaveMoreClick}
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

type TLookupFormModal = {
  open: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  isFetching?: boolean;
  form: FormInstance<any>;
  isDataLoading?: boolean;
  handleClose: VoidFunction;
  selectedRecordId?: number;
  onFinish: (values: any) => void;
  handleSaveMoreClick: VoidFunction;
};

export default LookupFormModal;
