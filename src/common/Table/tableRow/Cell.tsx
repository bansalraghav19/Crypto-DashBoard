import React, { memo } from "react";
import { connect } from "react-redux";
import { tableColumnI } from "../index";
import { StoreInterface } from "../../../storage/store";

interface PropsI {
  getSelectedCurrencydata: any;
  column: tableColumnI;
  row: any;
}

const Cell: React.FC<PropsI> = (props) => {
  const { column, row, getSelectedCurrencydata } = props;
  return column?.render?.(row, getSelectedCurrencydata?.data?.sign);
};

const mapStateToProps = (store: StoreInterface) => ({
  getSelectedCurrencydata: store?.homePage?.getSelectedCurrency,
});

export default connect(mapStateToProps, {})(memo(Cell));
