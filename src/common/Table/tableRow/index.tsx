import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import Cell from "./Cell";

interface field {
  key: string;
  name: string;
}

interface PropsI {
  tableData: any;
  fields: field[];
  clickable: boolean;
}

const TableRow: React.FC<PropsI> = (props) => {
  const { tableData, fields, clickable } = props;
  const history = useHistory();

  const handleRedirect = (uuid: string) => {
    if (clickable) history.push(`/coin/${uuid}`);
  };

  return (
    <tbody>
      {tableData?.map((row: any, idx: number) => (
        <tr
          onClick={() => handleRedirect(row?.uuid)}
          className="tc1Row"
          key={row?.uuid}
        >
          {fields?.map((field: field, index: number) => (
            <td className="tc1RowData" key={index}>
              <div className="tc1RowDataBox">
                <Cell field={field?.key} row={row} />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default memo(TableRow);
