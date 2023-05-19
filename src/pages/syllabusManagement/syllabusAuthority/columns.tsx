import { AntButton } from "@/components";
import { ColumnsType } from "antd/es/table";
import { EditFilled } from "@ant-design/icons";
import { TSyllabusAuthorityData } from "@/types/syllabusAuthority";

export const columns = (handleOpen: (id: number) => void): ColumnsType<TSyllabusAuthorityData> => [
  {
    title: "Code",
    dataIndex: "syllabusAuthorityCode",
  },
  {
    title: "Name",
    dataIndex: "syllabusAuthorityName",
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
