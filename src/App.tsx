import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import CoinPage from "./views/coinPage";
import HomePage from "./views/HomePage";
import { StoreInterface } from "./storage/store";
import {
  getAllCurrencies,
  getAllCachedCurrencies,
  getSelectedCurrency,
} from "./storage/HomePage/action";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "./utils/localStorage/index";
import "./App.css";

class App extends Component<PropsFromRedux, StateI> {
  constructor(props: any) {
    super(props);
    this.state = {
      isNightMode: true,
    };
  }

  setIsNightMode = () => {
    this.setState({
      isNightMode: !this.state.isNightMode,
    });
  };

  getDefaultCurrency = async (currencies: any) => {
    const defaultInr = currencies?.find((cur: any) => cur?.symbol === "INR");
    if (defaultInr) await this.props.getSelectedCurrency(defaultInr);
  };

  fetchApiData = async () => {
    await this.props.getAllCurrencies();
    if (
      !this?.props?.getAllCurrenciesData?.error &&
      this.props.getAllCurrenciesData?.data?.currencies
    ) {
      setLocalStorageValue("allCurrencies", {
        currencies: this.props.getAllCurrenciesData?.data?.currencies,
      });
      this.getDefaultCurrency(
        this?.props?.getAllCurrenciesData?.data?.currencies
      );
    }
  };

  fetchAllCurrencies = async () => {
    const storedValue: { isStored: boolean; data?: any } =
      getLocalStorageValue("allCurrencies");
    if (storedValue?.isStored) {
      await this.props.getAllCachedCurrencies(storedValue?.data);
      this.getDefaultCurrency(storedValue.data.currencies);
    } else {
      this.fetchApiData();
    }
  };

  componentDidMount = () => {
    this.fetchAllCurrencies();
  };

  render() {
    const { isNightMode } = this.state;
    return (
      <div className={`App ${isNightMode ? "" : " night"}`}>
        <Switch>
          <Route path="/" exact>
            <HomePage
              isNightMode={isNightMode}
              setIsNightMode={this.setIsNightMode}
            />
          </Route>
          <Route path="/coin/:coinId" exact>
            <CoinPage
              isNightMode={isNightMode}
              setIsNightMode={this.setIsNightMode}
            />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    );
  }
}

interface StateI {
  isNightMode: boolean;
}

const mapStateToProps = (store: StoreInterface) => ({
  getAllCurrenciesData: store.homePage.getAllCurrencies,
});

const connector = connect(mapStateToProps, {
  getAllCurrencies,
  getAllCachedCurrencies,
  getSelectedCurrency,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
