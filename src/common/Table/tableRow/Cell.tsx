import React, { memo } from "react";
import { connect } from "react-redux";
import { numberToWords } from "../../../utils/commonFunctions";
import { StoreInterface } from "../../../storage/store";

interface field {
  key: string;
  name: string;
}

const Cell = (props: any) => {
  const { field, row, getSelectedCurrencydata } = props;

  const getFieldValue = (field: string, row: any) => {
    switch (field) {
      case "name":
        return (
          <>
            <span className="mr-10">
              <img src={row?.iconUrl} />
            </span>
            <span className="mr-5">{row[field]}</span>
            <span> {`(${row?.symbol})`}</span>
          </>
        );
      case "rank":
        return <span>{numberToWords(row[field])}</span>;
      case "change": {
        const delta = numberToWords(row?.change);
        return (
          <div
            className="tc1pricebox"
            style={{
              color: parseInt(delta) >= 0 ? "green" : "red",
            }}
          >
            <span className="mr-5">{delta}%</span>
            <span>
              <i
                className={`fal fa-arrow-${
                  parseInt(delta) >= 0 ? "up" : "down"
                }`}
              ></i>
            </span>
          </div>
        );
      }
      case "price":
        const delta = numberToWords(row?.change);
        return (
          <div>
            {!isNaN(Number(delta)) && (
              <div
                className="tc1pricebox mb-10"
                style={{
                  color: parseInt(delta) >= 0 ? "green" : "red",
                }}
              >
                <span className="mr-5">{delta}%</span>
                <span>
                  <i
                    className={`fal fa-arrow-${
                      parseInt(delta) >= 0 ? "up" : "down"
                    }`}
                  ></i>
                </span>
              </div>
            )}
            <div>
              {getSelectedCurrencydata?.data?.sign || ""}
              {numberToWords(row[field])}
            </div>
          </div>
        );
      case "marketCap":
      case "24hVolume":
        return (
          <div>
            <div>
              {getSelectedCurrencydata?.data?.sign || ""}
              {numberToWords(row[field])}
            </div>
          </div>
        );
      case "source":
        return (
          <>
            <span className="mr-10">
              <img src={row?.exchange?.iconUrl} />
            </span>
            <span className="mr-5">{row?.exchange?.name}</span>
          </>
        );
      case "pairs":
        return (
          <span>
            {row?.base?.symbol} / {row?.quote?.symbol}
          </span>
        );
      default:
        return <span>{numberToWords(row[field])}</span>;
    }
  };

  return getFieldValue(field, row);
};

const mapStateToProps = (store: StoreInterface) => ({
  getSelectedCurrencydata: store?.homePage?.getSelectedCurrency,
});

export default connect(mapStateToProps, {})(memo(Cell));
