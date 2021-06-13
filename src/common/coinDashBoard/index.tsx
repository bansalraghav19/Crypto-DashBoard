import React, { useState, memo } from "react";
import { connect } from "react-redux";
import { numberToWords } from "../../utils/commonFunctions";
import { StoreInterface } from "../../storage/store";
import { SelectedCurrencyI } from "../../utils/dataInterfaces";
import "./style.css";

interface PropsI {
  data: any;
  getSelectedCurrencydata: {
    data: SelectedCurrencyI;
  };
}

const CoinDashBoard: React.FC<PropsI> = (props) => {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const { data, getSelectedCurrencydata } = props;

  const handleToggle = () => {
    setShowDescription((prevState) => !prevState);
  };

  const isPositiveChange = () => {
    return Math.floor(data?.change) >= 0;
  };

  return data ? (
    <div className="cdb1Container fadeInUp">
      <div className="cdb1Left">
        <div className="cdb1Row mb-20">
          <img className="mr-10" src={data?.iconUrl} alt="coinLogo" />
          <span style={{ color: data?.color }} className="cdb1name mr-10">
            {data?.name}
          </span>
          <span className="cdb1Tag">{data?.symbol}</span>
          <button onClick={handleToggle} className="cdb1Desc">
            {showDescription ? "Hide" : "View"} Description
          </button>
        </div>
        <div
          className={`cdb1descContainer ${
            showDescription ? "cdb1Show" : "cdb1Hide"
          }`}
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>
        <div className="cdb1Row mb-30">
          <span className="cdb1Tag cbd1Rank mr-10">Rank #{data?.rank}</span>
          <span className="cdb1Tag">Coin</span>
        </div>
        <div className="cdb1links">
          {data?.links?.map((item: any) => (
            <a href={item?.url}>
              <span className="mr-10 cdb1Tag mb-10">
                <span>{item?.name}</span>
                <i className="fas ml-10 fa-external-link-alt"></i>
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="cdb1Right">
        <div className="cdb1Row cdb1head mb-5">
          <span>
            {data?.name} Price ({data?.symbol})
          </span>
        </div>
        <div className="cdb1Row mb-10">
          <span className="cdb1price mr-10">
            {getSelectedCurrencydata?.data?.sign || ""}
            {numberToWords(data?.price)}
          </span>
          <span
            className={`cdb1Tag ${
              isPositiveChange() ? "cdb1Positive" : "cdb1Negative"
            }`}
          >
            {numberToWords(data?.change)}%
          </span>
        </div>
        <div className="mb-10 cdb1right">
          <div className="cdb1head">Highest Price </div>
          {getSelectedCurrencydata?.data?.sign || ""}
          {numberToWords(data?.allTimeHigh?.price)}
        </div>
        <div className="mb-10 cdb1right">
          <div className="cdb1head">Volume (24 Hr)</div>
          {getSelectedCurrencydata?.data?.sign || ""}
          {numberToWords(data?.["24hVolume"])}%
        </div>
        <div className="mb-10 cdb1right">
          <div className="cdb1head">Market Capacity </div>
          {getSelectedCurrencydata?.data?.sign || ""}
          {numberToWords(data?.marketCap)}%
        </div>
        <div className="cdb1right">
          <div className="cdb1head">Total Supply</div>{" "}
          {numberToWords(data?.supply?.circulating)}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (store: StoreInterface) => ({
  getSelectedCurrencydata: store?.homePage?.getSelectedCurrency,
});

export default connect(mapStateToProps, {})(memo(CoinDashBoard));
