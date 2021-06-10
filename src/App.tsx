import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import CoinPage from "./views/coinPage";
import HomePage from "./views/HomePage";
import { StoreInterface } from "./storage/store";
import {
  getAllCurrencies,
  getAllCachedCurrencies,
  getSelectedCurrency,
} from "./storage/HomePage/action";
import "./App.css";

interface PropsI {
  getAllCurrenciesData: any;
  getAllCurrencies: any;
  getAllCachedCurrencies: any;
  getSelectedCurrency: any;
}

interface StateI {
  isNightMode: boolean;
}

class App extends Component<PropsI, StateI> {
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

  getDefaultCurrency = async (array: any) => {
    const defaultInr = array.find((cur: any) => cur?.symbol === "INR");
    await this.props.getSelectedCurrency(defaultInr);
  };

  fetchAllCurrencies = async () => {
    const storedValue = localStorage.getItem("allCurrencies");
    if (storedValue) {
      await this.props.getAllCachedCurrencies(storedValue);
      this.getDefaultCurrency(JSON.parse(storedValue)?.data?.currencies);
    } else {
      await this.props.getAllCurrencies();
      localStorage.setItem(
        "allCurrencies",
        JSON.stringify({
          data: {
            currencies: this?.props?.getAllCurrenciesData?.data?.currencies,
          },
        })
      );
      this.getDefaultCurrency(
        this?.props?.getAllCurrenciesData?.data?.currencies
      );
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

const mapStateToProps = (store: StoreInterface) => ({
  getAllCurrenciesData: store.homePage.getAllCurrencies.data,
});

export default connect(mapStateToProps, {
  getAllCurrencies,
  getAllCachedCurrencies,
  getSelectedCurrency,
})(App);
