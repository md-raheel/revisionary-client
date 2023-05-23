import { AntButton } from "@/components";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";
import { TSubTopicsData } from "@/types/subTopics";

export const columns = (handleOpen: (id: number) => void): AntColumnType<TSubTopicsData>[] => [
  {
    searchableInput: true,
    title: "Topic",
    dataIndex: "unitTopicDescription",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.unitTopicDescription.localeCompare(b.unitTopicDescription),
  },
  {
    title: "Sub-Topic Code",
    searchableInput: true,
    dataIndex: "subTopicNo",
  },
  {
    searchableInput: true,
    title: "Sub-Topic Description",
    dataIndex: "subTopicDescription",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.subTopicDescription.localeCompare(b.subTopicDescription),
  },
  {
    title: "Action",
    align: "right",
    render: (_, record) => (
      <AntButton
        type="text"
        onClick={() => handleOpen(record?.subTopicId)}
        icon={<EditFilled style={{ color: "#00a148" }} />}
      />
    ),
  },
];
