import { Tooltip } from "antd";
import { AntButton } from "@/components";
import { ColumnsType } from "antd/es/table";
import { EditFilled } from "@ant-design/icons";
import { TSyllabusAuthorityData } from "@/types/syllabusAuthority";

export const columns: ColumnsType<TSyllabusAuthorityData> = [
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
      <Tooltip title="Edit">
        <AntButton
          type="text"
          onClick={() => alert("Coming soon")}
          icon={<EditFilled style={{ color: "#00a148" }} />}
        />
      </Tooltip>
    ),
  },
];
