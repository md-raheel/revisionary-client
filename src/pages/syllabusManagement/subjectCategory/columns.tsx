import { AntButton } from "@/components";
import { EditFilled } from "@ant-design/icons";
import { AntColumnType } from "@/types/antColumn";
import { TSubjectCategoryData } from "@/types/subjectCategory";

export const columns = (handleOpen: (id: number) => void): AntColumnType<TSubjectCategoryData>[] => [
  {
    title: "Code",
    dataIndex: "subjectCategoryCode",
  },
  {
    title: "Description",
    searchableInput: true,
    dataIndex: "subjectCategoryDescription",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.subjectCategoryDescription.localeCompare(b.subjectCategoryDescription),
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
