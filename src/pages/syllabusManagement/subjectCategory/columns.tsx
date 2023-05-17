import { Tooltip } from "antd";
import { AntButton } from "@/components";
import { ColumnsType } from "antd/es/table";
import { EditFilled } from "@ant-design/icons";
import { TSubjectCategoryData } from "@/types/subjectCategory";

export const columns: ColumnsType<TSubjectCategoryData> = [
  {
    title: "Code",
    dataIndex: "subjectCategoryCode",
  },
  {
    title: "Description",
    dataIndex: "subjectCategoryDescription",
  },
  {
    title: "Action",
    align: "right",
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: "#00a148" }} />}
        />
      </Tooltip>
    ),
  },
];
