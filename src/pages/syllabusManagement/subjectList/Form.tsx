import { map } from "lodash";
import { AntButton } from "@/components";
import { Col, Input, Row, Select } from "antd";

function SubjectListForm({
  classList,
  isClassListLoading,
  subjectCategoryList,
  syllabusAuthorityList,
  isSubjectCategoryListLoading,
  isSyllabusAuthorityListLoading,
}: TForm) {
  return (
    <div>
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
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
      <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
        <Col xs={24} sm={24} md={12} lg={12}>
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
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
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
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Col>

        <Col xs={24}>
          <Row gutter={[10, 10]}>
            <Col xs={24} md={8} lg={8} xl={7}>
              <Input size="large" placeholder="Subject Code" />
            </Col>
            <Col xs={24} md={12} lg={12} xl={13}>
              <Input size="large" placeholder="Subject Name" />
            </Col>
            <Col xs={24} md={4} lg={4} xl={4}>
              <AntButton label="Add" size="large" style={{ width: "100%" }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
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
