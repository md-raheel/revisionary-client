import "./style.scss";
import { ReactNode } from "react";
import { TableLoader } from "@/components";
import { Card, Result, Table, TableProps } from "antd";

function AntTable({
  data,
  title,
  isError,
  isLoading,
  tableTitle,
  numberOfSkeletons,
  ...restProps
}: TAntTable) {
  return (
    <Card className="table-card">
      {isError ? (
        <Result title="" status="500" subTitle="Sorry, something went wrong" />
      ) : isLoading ? (
        <TableLoader numberOfSkeletons={numberOfSkeletons} />
      ) : (
        <Table
          size="small"
          dataSource={data}
          title={() => tableTitle}
          pagination={{ pageSize: 5 }}
          {...restProps}
        />
      )}
    </Card>
  );
}

type TAntTable = {
  data?: Array<any>;
  isError?: boolean;
  isLoading?: boolean;
  tableTitle?: ReactNode;
  numberOfSkeletons?: number;
} & TableProps<any>;

export default AntTable;
