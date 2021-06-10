import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { HomePageFields, CACHE_TIME } from "../../utils/contansts";
import { scrollToTop } from "../../utils/commonFunctions";
import { LazyImport } from "../../utils/lazyImport";
import { getAllCoins } from "../../storage/HomePage/action";
import { StoreInterface } from "../../storage/store";
import "./style.css";

const Header = lazy(() => LazyImport(import("../../common/header/index")));
const SearchBar = lazy(() =>
  LazyImport(import("../../common/searchBar/index"))
);
const CardWrapper = lazy(() => LazyImport(import("../../common/cards/index")));
const Table = lazy(() => LazyImport(import("../../common/Table/index")));

interface PropsI {
  getAllCoinsData: any;
  getSelectedCurrencyData: any;
  getAllCoins: any;
  isNightMode: boolean;
  setIsNightMode: () => void;
  [key: string]: any;
}

interface StateI {
  coinsData: any;
}

class HomePage extends Component<PropsI, StateI> {
  constructor(props: any) {
    super(props);
    this.state = {
      coinsData: [],
    };
  }

  canUseCacheValue = () => {
    return new Promise((resolve) => {
      const { getSelectedCurrencyData } = this.props;
      const storedValue: any = localStorage.getItem(
        `allCoins-${getSelectedCurrencyData?.data?.symbol}`
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

  fetchCoinsData = async () => {
    if (this.props.getSelectedCurrencyData?.data?.uuid) {
      const valueCached: any = await this.canUseCacheValue();
      if (!valueCached) {
        const { uuid, symbol } = this.props.getSelectedCurrencyData?.data;
        await this?.props?.getAllCoins?.(uuid);
        const { getAllCoinsData } = this.props;
        if (!getAllCoinsData?.error) {
          this.setState({ coinsData: getAllCoinsData?.data?.data });
          localStorage.setItem(
            `allCoins-${symbol}`,
            JSON.stringify({
              data: getAllCoinsData?.data,
              expiryTime: new Date().getTime() + CACHE_TIME,
            })
          );
        }
      } else {
        this.setState({ coinsData: valueCached?.data?.data });
      }
    }
  };

  componentDidMount = () => {
    scrollToTop();
    this.fetchCoinsData();
  };

  componentDidUpdate = async (prevProps: any) => {
    if (
      prevProps?.getSelectedCurrencyData?.data?.symbol !==
      this.props.getSelectedCurrencyData?.data?.symbol
    ) {
      this.fetchCoinsData();
    }
  };

  render() {
    const { stats } = this.state.coinsData || {};
    return (
      <div className="hp1Layout">
        <Suspense fallback={<div></div>}>
          <Header
            isNightMode={this.props.isNightMode}
            setIsNightMode={this.props.setIsNightMode}
          />
        </Suspense>
        <Suspense fallback={<div></div>}>
          <SearchBar data={this?.state?.coinsData?.coins || []} />
        </Suspense>
        <Suspense fallback={<div></div>}>
          <CardWrapper dataList={stats} />
        </Suspense>
        <Suspense fallback={<div></div>}>
          <Table
            fields={HomePageFields}
            data={this?.state?.coinsData?.coins || []}
            clickable={true}
          />
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (store: StoreInterface) => ({
  getAllCoinsData: store.homePage.getAllCoinsData,
  getSelectedCurrencyData: store.homePage.getSelectedCurrency,
});

export default connect(mapStateToProps, { getAllCoins })(HomePage);
