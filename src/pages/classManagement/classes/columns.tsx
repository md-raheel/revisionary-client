import { Tooltip } from "antd";
import { AntButton } from "@/components";
import { TClassData } from "@/types/classes";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";

export const columns = (handleOpen: (id: number) => void): AntColumnType<TClassData>[] => [
  {
    title: "Code",
    dataIndex: "classCode",
  },
  {
    title: "Name",
    searchableInput: true,
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
