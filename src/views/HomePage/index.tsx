import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { homePageTableColumns } from "../../utils/tableData/index";
import { scrollToTop } from "../../utils/commonFunctions";
import { LazyImport } from "../../utils/lazyImport";
import { getAllCoins } from "../../storage/HomePage/action";
import { StoreInterface } from "../../storage/store";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "../../utils/localStorage/index";
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

  fetchApiData = async () => {
    const getSelectedCurrencyData = this.props;
    const { uuid, symbol } = getSelectedCurrencyData?.data;
    await this.props.getAllCoins(uuid);
    const { getAllCoinsData } = this.props;
    if (!getAllCoinsData?.error) {
      this.setState({ coinsData: getAllCoinsData?.data?.data });
      setLocalStorageValue(`allCoins-${symbol}`, getAllCoinsData?.data, true);
    }
  };

  fetchCoinsData = async () => {
    if (this.props.getSelectedCurrencyData?.data?.uuid) {
      const getSelectedCurrencyData = this.props;
      const valueCached: { isStored: boolean; data?: any } =
        getLocalStorageValue(
          `allCoins-${getSelectedCurrencyData?.data?.symbol}`
        );
      if (!valueCached?.isStored) {
        this.fetchApiData();
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
            dataColumns={homePageTableColumns}
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
