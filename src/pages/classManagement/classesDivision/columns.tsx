import { Tooltip } from "antd";
import { AntButton } from "@/components";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";
import { TClassDivisionData } from "@/types/classDivision";

export const columns = (handleOpen: (id: number) => void): AntColumnType<TClassDivisionData>[] => [
  {
    title: "Class",
    searchableInput: true,
    dataIndex: "className",
  },
  {
    title: "Code",
    dataIndex: "classSubDivisionCode",
  },
  {
    title: "Name",
    searchableInput: true,
    dataIndex: "divisionDescription",
  },
  {
    title: "Action",
    align: "right",
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: "#00a148" }} />}
          onClick={() => handleOpen(record?.classSubDivisionId)}
        />
      </Tooltip>
    ),
  },
];
