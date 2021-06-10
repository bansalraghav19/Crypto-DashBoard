import React, { Component, lazy, Suspense } from "react";
import { coinPageFields, CACHE_TIME } from "../../utils/contansts";
import { scrollToTop } from "../../utils/commonFunctions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getCoinDataById, getCoinMarkets } from "../../storage/CoinPage/action";
import { StoreInterface } from "../../storage/store";
import "./style.css";
import { LazyImport } from "../../utils/lazyImport";

const Header = lazy(() => LazyImport(import("../../common/header/index")));
const CoinDashBoard = lazy(() =>
  LazyImport(import("../../common/coinDashBoard/index"))
);
const Table = lazy(() => LazyImport(import("../../common/Table/index")));
const ErrorPage = lazy(() =>
  LazyImport(import("../../common/errorPage/index"))
);

class CoinPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      coinData: null,
      coinMarketData: [],
      showErrorMessage: false,
    };
  }

  fetchApiData = async () => {
    const countryId = this?.props?.getSelectedCurrencyData?.data?.uuid;
    const coinUuid = this?.props?.match?.params?.coinId;
    await Promise.all([
      this.props.getCoinDataById(coinUuid, countryId),
      this.props.getCoinMarkets(coinUuid, countryId),
    ]);
  };

  canUseCacheValue = () => {
    const countrySymbol = this?.props?.getSelectedCurrencyData?.data?.symbol;
    return new Promise((resolve) => {
      const storedValue: any = localStorage.getItem(
        `${this?.props?.match?.params?.coinId}-${countrySymbol}`
      );
      if (
        !storedValue ||
        Number(JSON.parse(storedValue)?.expiryTime) <
          Number(new Date().getTime())
      ) {
        resolve(false);
      }
      resolve(JSON.parse(storedValue));
    });
  };

  fetchDetails = async () => {
    const { getSelectedCurrencyData } = this.props;
    if (getSelectedCurrencyData?.data?.uuid) {
      const valueCached: any = await this.canUseCacheValue();
      if (!valueCached) {
        await this.fetchApiData();
        if (!this?.props?.getCoinByIdData.error) {
          const countrySymbol =
            this?.props?.getSelectedCurrencyData?.data?.symbol;
          this.setState({
            showErrorMessage: false,
            coinMarketData: this?.props?.getCoinMarketData?.data?.data,
            coinData: this?.props?.getCoinByIdData?.data?.data?.coin,
          });
          localStorage.setItem(
            `${this?.props?.match?.params?.coinId}-${countrySymbol}`,
            JSON.stringify({
              marketData: this?.props?.getCoinMarketData?.data?.data,
              dashBoardData: this?.props?.getCoinByIdData?.data?.data?.coin,
              expiryTime: new Date().getTime() + CACHE_TIME,
            })
          );
        } else {
          this.setState({
            showErrorMessage: true,
          });
        }
      } else {
        this.setState({
          showErrorMessage: false,
          coinMarketData: valueCached?.marketData,
          coinData: valueCached?.dashBoardData,
        });
      }
    }
  };

  componentDidMount = async () => {
    scrollToTop();
    this.fetchDetails();
  };

  componentDidUpdate = async (prevProps: any) => {
    if (
      prevProps?.getSelectedCurrencyData?.data?.symbol !==
      this.props.getSelectedCurrencyData?.data?.symbol
    ) {
      this.fetchDetails();
    }
  };

  render() {
    return (
      <div className="cp56Layout">
        <Suspense fallback={<div></div>}>
          <Header
            isNightMode={this.props.isNightMode}
            setIsNightMode={this.props.setIsNightMode}
          />
        </Suspense>
        <Suspense fallback={<div></div>}>
          {this.state.showErrorMessage && <ErrorPage />}
        </Suspense>
        <Suspense fallback={<div></div>}>
          <CoinDashBoard data={this.state?.coinData} />
        </Suspense>
        <Suspense fallback={<div></div>}>
          <Table
            fields={coinPageFields}
            data={this?.state?.coinMarketData?.markets || []}
          />
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (store: StoreInterface) => ({
  getCoinByIdData: store.coinPage.getCoinById,
  getCoinMarketData: store.coinPage.getCoinMarkets,
  getSelectedCurrencyData: store.homePage.getSelectedCurrency,
});

export default connect(mapStateToProps, { getCoinDataById, getCoinMarkets })(
  withRouter(CoinPage)
);
