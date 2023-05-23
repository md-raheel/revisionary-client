import { AntButton } from "@/components";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";
import { TSubTopicsData } from "@/types/subTopics";

export const columns = (handleOpen: (id: number) => void): AntColumnType<TSubTopicsData>[] => [
  {
    title: "Subject Name",
    searchableInput: true,
    dataIndex: "unitTopicDescription",
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
        onClick={() => handleOpen(record?.subTopicId)}
      />
    ),
  },
];
