import React, { memo } from "react";

interface field {
  key: string;
  name: string;
}

const TableHeader = (props: any) => {
  const { fields, handleSort, curSortingParameter, isAscendingSort } = props;
  return (
    <thead>
      {fields?.map((field: field, index: number) => (
        <th
          onClick={() => handleSort(field?.key)}
          className="tc1Header"
          key={index}
        >
          <span>{field.name}</span>
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
