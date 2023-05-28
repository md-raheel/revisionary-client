import { isNumber, map } from "lodash";
import { useEffect, useState } from "react";
import { useGetSubjectLists } from "@/hooks/apis/useSubjectList";
import LookupFormModal from "@/pages/components/LookupFormModal";
import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import { useGetClassDivisions } from "@/hooks/apis/useClassDivision";
import { useAddUpdateTopic, useGetTopicById } from "@/hooks/apis/useTopics";
import { TTopicFormDataOnAdd, TTopicFormDataOnUpdate } from "@/types/topics";

function AddUpdateRecord({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { data: subjectListData, isLoading: isSubjectListLoading } = useGetSubjectLists();
  const { data: classDivisionData, isLoading: isClassDivisionLoading } = useGetClassDivisions();

  const { mutate, isLoading, isSuccess } = useAddUpdateTopic(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetTopicById(selectedRecordId);

  const onFinish = (values: TTopicFormDataOnAdd | TTopicFormDataOnUpdate) => {
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
      form.setFieldsValue(data?.data?.apiData);
    }
  }, [isDataSuccess]);

  return (
    <LookupFormModal
      open={open}
      form={form}
      width={650}
      title="Topics"
      onFinish={onFinish}
      isLoading={isLoading}
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={12}>
          <Form.Item
            name="classesSubDivisionId"
            rules={[{ required: true, message: "Please input your Class Division!" }]}
          >
            <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Class Division"
              loading={isClassDivisionLoading}
              options={map(classDivisionData?.data?.apiData, (item) => ({
                value: item?.classSubDivisionId,
                label: item?.divisionDescription,
              }))}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item name="subjectListId" rules={[{ required: true, message: "Please input your Subject List!" }]}>
            <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Subject List"
              loading={isSubjectListLoading}
              options={map(subjectListData?.data?.apiData, (item) => ({
                label: item?.subjectName,
                value: item?.subjectListId,
              }))}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>

        <Col xs={8}>
          <Form.Item name="unitTopicNo" rules={[{ required: true, message: "Please input your Code!" }]}>
            <Input size="large" placeholder="Topic Code" />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item
            name="unitTopicDescription"
            rules={[{ required: true, message: "Please input your Description!" }]}
          >
            <Input size="large" placeholder="Topic Description" />
          </Form.Item>
        </Col>
      </Row>
    </LookupFormModal>
  );
}

type TAddUpdateRecord = {
  open: boolean;
  form: FormInstance<any>;
  handleClose: VoidFunction;
  selectedRecordId?: number;
};

export default AddUpdateRecord;
