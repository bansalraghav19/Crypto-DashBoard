import React, { memo, useCallback, useEffect, useState } from "react";
import TableHeader from "./tableHead";
import TableRow from "./tableRow/index";
import "./style.css";

export interface tableColumnI {
  key: string;
  name: string;
  render: (row: any, currency?: string) => JSX.Element;
  sortingFunction: (
    initialArray: any[],
    fieldName: string,
    increasing: boolean
  ) => any[];
}

interface PropsI {
  dataColumns: tableColumnI[];
  clickable: boolean;
  data: any;
}

const Table: React.FC<PropsI> = (props) => {
  const [tableData, setTableData] = useState<any>([]);
  const [curSortingParameter, setCurSortingParameter] = useState("rank");
  const [isAscendingSort, setIsAscendingSort] = useState(true);

  const { dataColumns, data, clickable } = props;

  useEffect(() => {
    setTableData(data || []);
  }, [props.data]);

  const handleSort = useCallback(
    (field: tableColumnI) => {
      let isIncreasing: boolean = true;
      if (field?.key === curSortingParameter) {
        isIncreasing = !isAscendingSort;
        setIsAscendingSort((prevState) => !prevState);
      } else {
        setCurSortingParameter(field?.key);
        setIsAscendingSort(true);
      }
      const sortedData = field?.sortingFunction(
        tableData,
        field?.key,
        isIncreasing
      );
      setTableData(sortedData);
    },
    [curSortingParameter, isAscendingSort, tableData]
  );

  return (
    <div className="tc1Container fadeInUp">
      <table className="tc1Table">
        {tableData?.length > 0 && (
          <TableHeader
            dataColumns={dataColumns}
            curSortingParameter={curSortingParameter}
            isAscendingSort={isAscendingSort}
            handleSort={handleSort}
          />
        )}
        <TableRow
          dataColumns={dataColumns}
          tableData={tableData}
          clickable={clickable}
        />
      </table>
    </div>
  );
};

export default memo(Table);
