import React, { Component, lazy, Suspense } from "react";
import { scrollToTop } from "../../utils/commonFunctions";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { getCoinDataById, getCoinMarkets } from "../../storage/CoinPage/action";
import { StoreInterface } from "../../storage/store";
import "./style.css";
import { LazyImport } from "../../utils/lazyImport";
import { coinPageTableColumns } from "../../utils/tableData";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "../../utils/localStorage";

const Header = lazy(() => LazyImport(import("../../common/header/index")));
const CoinDashBoard = lazy(() =>
  LazyImport(import("../../common/coinDashBoard/index"))
);
const Table = lazy(() => LazyImport(import("../../common/Table/index")));
const ErrorPage = lazy(() =>
  LazyImport(import("../../common/errorPage/index"))
);

type PathParamsType = {
  coinId: string;
};

interface PropsI {
  getCoinByIdData: any;
  getCoinMarketData: any;
  getCoinDataById: any;
  getCoinMarkets: any;
  getSelectedCurrencyData: any;
  isNightMode: boolean;
  setIsNightMode: () => void;
  [key: string]: any;
}

interface StateI {
  coinData: any;
  coinMarketData: any;
  showErrorMessage: boolean;
}

class CoinPage extends Component<
  PropsI & RouteComponentProps<PathParamsType>,
  StateI
> {
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
    if (!this?.props?.getCoinByIdData.error) {
      const countrySymbol = this?.props?.getSelectedCurrencyData?.data?.symbol;
      this.setState({
        showErrorMessage: false,
        coinMarketData: this?.props?.getCoinMarketData?.data?.data,
        coinData: this?.props?.getCoinByIdData?.data?.data?.coin,
      });
      setLocalStorageValue(
        `${this?.props?.match?.params?.coinId}-${countrySymbol}`,
        {
          marketData: this?.props?.getCoinMarketData?.data?.data,
          dashBoardData: this?.props?.getCoinByIdData?.data?.data?.coin,
        },
        true
      );
    } else {
      this.setState({
        showErrorMessage: true,
      });
    }
  };

  fetchDetails = async () => {
    const { getSelectedCurrencyData } = this.props;
    if (getSelectedCurrencyData?.data?.uuid) {
      const countrySymbol = this?.props?.getSelectedCurrencyData?.data?.symbol;
      const valueCached: { isStored: boolean; data?: any } =
        getLocalStorageValue(
          `${this?.props?.match?.params?.coinId}-${countrySymbol}`
        );
      if (!valueCached?.isStored) {
        await this.fetchApiData();
      } else {
        this.setState({
          showErrorMessage: false,
          coinMarketData: valueCached?.data.marketData,
          coinData: valueCached?.data.dashBoardData,
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
            dataColumns={coinPageTableColumns}
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
