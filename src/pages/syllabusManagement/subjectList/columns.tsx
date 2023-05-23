import { AntButton } from "@/components";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";
import { TSubjectListData } from "@/types/subjectList";

export const columns = (setSelectedRecordId?: any): AntColumnType<TSubjectListData>[] => [
  {
    title: "Publisher",
    searchableInput: true,
    dataIndex: "syllabusAuthorityName",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.syllabusAuthorityName.localeCompare(b.syllabusAuthorityName),
  },
  {
    title: "Code",
    dataIndex: "subjectCode",
  },
  {
    title: "Subject Name",
    searchableInput: true,
    dataIndex: "subjectName",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.subjectName.localeCompare(b.subjectName),
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
