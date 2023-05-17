import { columns } from "./columns";
import { AntTable } from "@/components";
import { TSyllabusAuthorityData } from "@/types/syllabusAuthority";

function SyllabusAuthority({ data, isError, isLoading }: TSyllabusAuthority) {
  return (
    <div>
      <AntTable
        data={data}
        isError={isError}
        columns={columns}
        isLoading={isLoading}
        numberOfSkeletons={6}
        tableTitle="Syllabus Authority / Publisher"
        rowKey={(record: any) => record?.syllabusAuthorityId}
      />
    </div>
  );
}

type TSyllabusAuthority = {
  data: Array<TSyllabusAuthorityData>;
  isError: boolean;
  isLoading: boolean;
};

export default SyllabusAuthority;
