import { Tooltip } from "antd";
import { AntButton } from "@/components";
import { ColumnsType } from "antd/es/table";
import { EditFilled } from "@ant-design/icons";
import { TSubjectListData } from "@/types/subjectList";

export const columns: ColumnsType<TSubjectListData> = [
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
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: "#00a148" }} />}
        />
      </Tooltip>
    ),
  },
];
