import React, { Component, lazy, Suspense } from "react";
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

const Header = lazy(() => import("./common/header/index"));

class App extends Component<PropsFromRedux> {
  getDefaultCurrency = async (currencies: any) => {
    const defaultInr = currencies?.find((cur: any) => cur?.symbol === "INR");
    if (defaultInr) await this.props.getSelectedCurrency(defaultInr);
  };

  fetchApiData = async () => {
    await this.props.getAllCurrencies();
    console.log(this.props.getAllCurrenciesData);
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
    return (
      <div className="App">
        <Suspense fallback={<div></div>}>
          <Header />
        </Suspense>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/coin/:coinId" exact>
            <CoinPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    );
  }
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
