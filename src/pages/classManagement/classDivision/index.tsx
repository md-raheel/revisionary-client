import { columns } from "./columns";
import SideTable from "../../components/SideTable";
import { TClassDivisionData } from "@/types/classDivision";

function ClassDivision({ data, isError, isLoading }: TClassDivision) {
  return (
    <div>
      <SideTable
        data={data}
        columns={columns}
        isError={isError}
        isLoading={isLoading}
        numberOfSkeletons={6}
        title="Subject Category"
        rowKey={(record) => record?.subjectCategoryId}
      />
    </div>
  );
}

type TClassDivision = {
  data: Array<TClassDivisionData>;
  isError: boolean;
  isLoading: boolean;
};

export default ClassDivision;
