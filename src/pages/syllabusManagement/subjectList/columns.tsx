import { AntButton } from "@/components";
import { ColumnsType } from "antd/es/table";
import { EditFilled } from "@ant-design/icons";
import { TSubjectListData } from "@/types/subjectList";

export const columns = (setSelectedRecordId?: any): ColumnsType<TSubjectListData> => [
  {
    title: "Publisher",
    dataIndex: "syllabusAuthorityName",
  },
  {
    title: "Code",
    dataIndex: "subjectCode",
  },
  {
    title: "Subject Name",
    dataIndex: "subjectName",
  },
  {
    title: "Action",
    align: "right",
    render: (_, record) => (
      <AntButton
        type="text"
        icon={<EditFilled style={{ color: "#00a148" }} />}
        onClick={() => setSelectedRecordId(record?.subjectListId)}
      />
    ),
  },
];
