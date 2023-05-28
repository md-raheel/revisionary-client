import { AntButton } from "@/components";
import { TTopicsData } from "@/types/topics";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";

export const columns = (handleOpen: (id: number) => void): AntColumnType<TTopicsData>[] => [
  {
    searchableInput: true,
    title: "Class Division",
    dataIndex: "classSubDivision",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.classSubDivision.localeCompare(b.classSubDivision),
  },
  {
    title: "Subject Name",
    searchableInput: true,
    dataIndex: "subjectName",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.unitTopicDescription.localeCompare(b.unitTopicDescription),
  },
  {
    title: "Topic Code",
    dataIndex: "unitTopicNo",
  },
  {
    searchableInput: true,
    title: "Topic Description",
    dataIndex: "unitTopicDescription",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.unitTopicDescription.localeCompare(b.unitTopicDescription),
  },
  {
    title: "Action",
    align: "right",
    render: (_, record) => (
      <AntButton
        type="text"
        icon={<EditFilled style={{ color: "#00a148" }} />}
        onClick={() => handleOpen(record?.unitTopicId)}
      />
    ),
  },
];
