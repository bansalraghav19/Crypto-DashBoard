import React, { memo } from "react";
import { tableColumnI } from "../index";

const TableHeader = (props: any) => {
  const { dataColumns, handleSort, curSortingParameter, isAscendingSort } =
    props;
  return (
    <thead>
      {dataColumns?.map((field: tableColumnI, index: number) => (
        <th onClick={() => handleSort(field)} className="tc1Header" key={index}>
          <span>{field?.name}</span>
          {curSortingParameter === field.key &&
            (isAscendingSort ? (
              <i className="ml-10 fas fa-sort-amount-up"></i>
            ) : (
              <i className="ml-10 fas fa-sort-amount-down-alt"></i>
            ))}
        </th>
      ))}
    </thead>
  );
};

export default memo(TableHeader);
