import "./style.scss";
import { TableLoader } from "@/components";
import { Card, Result, Table, TableProps } from "antd";

const AntTable = ({
  data,
  title,
  isError,
  isLoading,
  tableTitle,
  numberOfSkeletons,
  ...restProps
}: TAntTable) => (
  <Card className="table-card">
    {isError ? (
      <Result title="" status="500" subTitle="Sorry, something went wrong" />
    ) : isLoading ? (
      <TableLoader numberOfSkeletons={numberOfSkeletons} />
    ) : (
      <Table
        size="small"
        dataSource={data}
        pagination={{ pageSize: 5 }}
        title={() => <h3>{tableTitle}</h3>}
        {...restProps}
      />
    )}
  </Card>
);

type TAntTable = {
  data?: Array<any>;
  isError?: boolean;
  isLoading?: boolean;
  tableTitle?: string;
  numberOfSkeletons?: number;
} & TableProps<any>;

export default AntTable;
