import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { tableColumnI } from "../index";
import Cell from "./Cell";

interface PropsI {
  tableData: any;
  dataColumns: tableColumnI[];
  clickable: boolean;
}

const TableRow: React.FC<PropsI> = (props) => {
  const { tableData, dataColumns, clickable } = props;
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
          {dataColumns?.map((field: tableColumnI, index: number) => (
            <td className="tc1RowData" key={index}>
              <div className={`tc1RowDataBox tc1cell${field.key}`}>
                <Cell column={field} row={row} />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default memo(TableRow);
