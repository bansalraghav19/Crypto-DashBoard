import React, { useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { StoreInterface } from "../../storage/store";
import CustomSelect from "../select";
import { getSelectedCurrency } from "../../storage/HomePage/action";
import "./style.css";

const Header = (props: any) => {
  const {
    setIsNightMode,
    getAllCurrenciesData,
    isNightMode,
    getSelectedCurrencydata,
    getSelectedCurrency,
  } = props;
  const [currentCurrency, setCurrentCurrency] = useState<any>({});

  useEffect(() => {
    setCurrentCurrency(getSelectedCurrencydata?.data);
  }, [getSelectedCurrencydata]);

  const handleChange = async (data: any) => {
    await getSelectedCurrency(data);
  };

  return (
    <div className="header1container fadeInUp">
      <div className="header1headings">
        <h1>Crypto DashBoard</h1>
        <div className="header1RightCol">
          <CustomSelect
            dataList={getAllCurrenciesData?.data?.currencies || []}
            onChange={handleChange}
            currentCurrency={currentCurrency}
          />
          <i
            onClick={setIsNightMode}
            className={`fas fa-${isNightMode ? "sun" : "moon"}`}
          ></i>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: StoreInterface) => ({
  getAllCurrenciesData: store?.homePage?.getAllCurrencies?.data,
  getSelectedCurrencydata: store?.homePage?.getSelectedCurrency,
});

export default connect(mapStateToProps, { getSelectedCurrency })(memo(Header));
