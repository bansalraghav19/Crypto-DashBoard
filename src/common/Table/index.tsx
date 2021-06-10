import React, { useCallback, useEffect, useState } from "react";
import TableHeader from "./tableHead";
import TableRow from "./tableRow/index";
import "./style.css";

const Table = (props: any) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [curSortingParameter, setCurSortingParameter] = useState("");
  const [isAscendingSort, setIsAscendingSort] = useState(true);

  const { fields, data, clickable } = props;

  useEffect(() => {
    setTableData(data || []);
  }, [props.data]);

  const handleSort = useCallback(
    (field: string) => {
      console.log(field);
      let isIncreasing: boolean = true;
      if (field === curSortingParameter) {
        isIncreasing = !isAscendingSort;
        setIsAscendingSort((prevState) => !prevState);
      } else {
        setCurSortingParameter(field);
        setIsAscendingSort(true);
      }
      let sortedData = [...(data || [])];
      if (field === "name") {
        sortedData.sort((a, b) =>
          isIncreasing
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field])
        );
      } else if (field === "source") {
        sortedData.sort((a, b) =>
          isIncreasing
            ? a?.exchange?.name.localeCompare(b?.exchange?.name)
            : b?.exchange?.name.localeCompare(a?.exchange?.name)
        );
      } else if (field === "pairs") {
        sortedData.sort((a, b) => {
          const stringA: string = `${a?.base?.symbol}${a?.quote?.symbol}`;
          const stringB: string = `${b?.base?.symbol}${b?.quote?.symbol}`;
          return isIncreasing
            ? stringA.localeCompare(stringB)
            : stringB.localeCompare(stringA);
        });
      } else {
        sortedData.sort(
          (a, b) => (a[field] - b[field]) * (isIncreasing ? 1 : -1)
        );
      }
      setTableData(sortedData);
    },
    [curSortingParameter, isAscendingSort, data]
  );

  return (
    <div className="tc1Container fadeInUp">
      <table className="tc1Table">
        {tableData?.length > 0 && (
          <TableHeader
            fields={fields}
            curSortingParameter={curSortingParameter}
            isAscendingSort={isAscendingSort}
            handleSort={handleSort}
          />
        )}
        <TableRow fields={fields} tableData={tableData} clickable={clickable} />
      </table>
    </div>
  );
};

export default Table;
