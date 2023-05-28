import moment from "moment";
import { isNumber, map } from "lodash";
import { useEffect, useState } from "react";
import { TClassData } from "@/types/classes";
import LookupFormModal from "@/pages/components/LookupFormModal";
import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from "antd";
import { useAddUpdateClassDivision, useGetClassDivisionById } from "@/hooks/apis/useClassDivision";
import { TClassDivisionFormDataOnAdd, TClassDivisionFormDataOnUpdate } from "@/types/classDivision";

function AddUpdateRecord({ open, form, handleClose, classData, isClassLoading, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddUpdateClassDivision(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetClassDivisionById(selectedRecordId);

  const onFinish = (values: TClassDivisionFormDataOnAdd | TClassDivisionFormDataOnUpdate) => {
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      if (!btnClicked) handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      const date = new Date(data?.data?.apiData?.effectiveFrom);
      form.setFieldsValue({ ...data?.data?.apiData, effectiveFrom: moment(date) });
    }
  }, [isDataSuccess]);

  return (
    <LookupFormModal
      open={open}
      form={form}
      width={650}
      onFinish={onFinish}
      isLoading={isLoading}
      title="Class Division"
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={12}>
          <Form.Item name="classId" rules={[{ required: true, message: "Please input your Class!" }]}>
            <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Class"
              loading={isClassLoading}
              options={map(classData, (item) => ({
                value: item?.classId,
                label: item?.className,
              }))}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item name="effectiveFrom" rules={[{ required: true, message: "Please input Date!" }]}>
            <DatePicker size="large" format="DD-MMM-YYYY" placeholder="Effective From" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={8}>
          <Form.Item name="classSubDivisionCode" rules={[{ required: true, message: "Please input your Code!" }]}>
            <Input size="large" placeholder="Code" />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item
            name="classSubDivisionDescription"
            rules={[{ required: true, message: "Please input your Description!" }]}
          >
            <Input size="large" placeholder="Name" />
          </Form.Item>
        </Col>
      </Row>
    </LookupFormModal>
  );
}

type TAddUpdateRecord = {
  open: boolean;
  form: FormInstance<any>;
  isClassLoading: boolean;
  handleClose: VoidFunction;
  selectedRecordId?: number;
  classData: Array<TClassData>;
};

export default AddUpdateRecord;
