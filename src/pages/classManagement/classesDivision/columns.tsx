import { Tooltip } from "antd";
import { AntButton } from "@/components";
import { ColumnsType } from "antd/es/table";
import { TClassData } from "@/types/classes";
import { EditFilled } from "@ant-design/icons";

export const columns = (handleOpen: (id: number) => void): ColumnsType<TClassData> => [
  {
    title: "Code",
    dataIndex: "classCode",
  },
  {
    title: "Name",
    dataIndex: "className",
  },
  {
    title: "Action",
    align: "right",
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          onClick={() => handleOpen(record?.classId)}
          icon={<EditFilled style={{ color: "#00a148" }} />}
        />
      </Tooltip>
    ),
  },
];
