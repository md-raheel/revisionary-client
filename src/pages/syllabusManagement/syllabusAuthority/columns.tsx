import { AntButton } from "@/components";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";
import { TSyllabusAuthorityData } from "@/types/syllabusAuthority";

export const columns = (handleOpen: (id: number) => void): AntColumnType<TSyllabusAuthorityData>[] => [
  {
    title: "Code",
    dataIndex: "syllabusAuthorityCode",
  },
  {
    title: "Name",
    searchableInput: true,
    dataIndex: "syllabusAuthorityName",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.syllabusAuthorityName.localeCompare(b.syllabusAuthorityName),
  },
  {
    title: "Action",
    align: "right",
    render: (_, record) => (
      <AntButton
        type="text"
        icon={<EditFilled style={{ color: "#00a148" }} />}
        onClick={() => handleOpen(record?.syllabusAuthorityId)}
      />
    ),
  },
];
