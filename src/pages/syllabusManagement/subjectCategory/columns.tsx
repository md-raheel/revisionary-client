import { AntButton } from "@/components";
import { ColumnsType } from "antd/es/table";
import { EditFilled } from "@ant-design/icons";
import { TSubjectCategoryData } from "@/types/subjectCategory";

export const columns = (handleOpen: (id: number) => void): ColumnsType<TSubjectCategoryData> => [
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
      <AntButton
        type="text"
        icon={<EditFilled style={{ color: "#00a148" }} />}
        onClick={() => handleOpen(record?.subjectCategoryId)}
      />
    ),
  },
];
