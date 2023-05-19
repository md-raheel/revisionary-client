import { map } from "lodash";
import { useEffect } from "react";
import { AntButton } from "@/components";
import { Col, Input, Row, Select, Form } from "antd";
import { useAddSubjectList } from "@/hooks/apis/useSubjectList";
import { TSubjectListFormDataOnAdd } from "@/types/subjectList";

function SubjectListForm({
  classList,
  isClassListLoading,
  subjectCategoryList,
  syllabusAuthorityList,
  isSubjectCategoryListLoading,
  isSyllabusAuthorityListLoading,
}: TForm) {
  const [form] = Form.useForm();
  const { mutate, isSuccess } = useAddSubjectList();

  const onFinish = (values: TSubjectListFormDataOnAdd) => mutate(values);

  useEffect(() => {
    if (isSuccess) form.resetFields();
  }, [isSuccess]);

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ remember: true }}>
      <Form.Item
        name="syllabusAuthorityId"
        rules={[
          {
            required: true,
            message: "Please input your Syllabus Authority / Publisher!",
          },
        ]}
      >
        <Select
          showSearch
          size="large"
          style={{ width: "100%" }}
          placeholder="Syllabus Authority / Publisher"
          loading={isSyllabusAuthorityListLoading}
          options={map(syllabusAuthorityList, (item) => ({
            value: item?.syllabusAuthorityId,
            label: item?.syllabusAuthorityName,
          }))}
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
        />
      </Form.Item>
      <Row gutter={10}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            name="subjectCategoryId"
            rules={[
              {
                required: true,
                message: "Please input your Subject Category!",
              },
            ]}
          >
            <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Subject Category"
              loading={isSubjectCategoryListLoading}
              options={map(subjectCategoryList, (item) => ({
                value: item?.subjectCategoryId,
                label: item?.subjectCategoryDescription,
              }))}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            name="classId"
            rules={[
              {
                required: true,
                message: "Please input your Class!",
              },
            ]}
          >
            <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Class"
              loading={isClassListLoading}
              options={map(classList, (item) => ({
                value: item?.classId,
                label: item?.className,
              }))}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Row gutter={10}>
            <Col xs={24} md={8} lg={8} xl={7}>
              <Form.Item
                name="subjectCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Code!",
                  },
                ]}
              >
                <Input size="large" placeholder="Subject Code" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12} xl={13}>
              <Form.Item
                name="subjectName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Subject Name!",
                  },
                ]}
              >
                <Input size="large" placeholder="Subject Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4} lg={4} xl={4}>
              <Form.Item>
                <AntButton label="Add" size="large" htmlType="submit" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

type TForm = {
  isClassListLoading: boolean;
  isSubjectCategoryListLoading: boolean;
  isSyllabusAuthorityListLoading: boolean;
  classList: Array<{ [key: string]: string }>;
  subjectCategoryList: Array<{ [key: string]: string }>;
  syllabusAuthorityList: Array<{ [key: string]: string }>;
};

export default SubjectListForm;
