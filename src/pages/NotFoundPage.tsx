import { Result } from "antd";
import { AntButton } from "@/components";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<AntButton label="Back Home" onClick={handleClick} />}
    />
  );
}

export default NotFoundPage;
