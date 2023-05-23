import Topics from "./Topics";
import SubTopics from "./subTopics";
import { useGetTopics } from "@/hooks/apis/useTopics";
import { useGetSubTopics } from "@/hooks/apis/useSubTopics";

function SubjectTopics() {
  const { data, isError, isLoading } = useGetTopics();
  const { data: subTData, isError: isSubTError, isLoading: isSubTLoading } = useGetSubTopics();

  return (
    <div>
      <Topics isError={isError} isLoading={isLoading} data={data?.data?.apiData || []} />
      <br />
      <SubTopics isError={isSubTError} isLoading={isSubTLoading} data={subTData?.data?.apiData || []} />
    </div>
  );
}

export default SubjectTopics;
