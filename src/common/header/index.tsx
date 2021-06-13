import React, { useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { StoreInterface } from "../../storage/store";
import CustomSelect from "../select";
import { getSelectedCurrency } from "../../storage/HomePage/action";
import { SelectedCurrencyI } from "../../utils/dataInterfaces";
import "./style.css";

interface PropsI {
  isNightMode: boolean;
  setIsNightMode: () => void;
  getAllCurrenciesData: any;
  getSelectedCurrencydata?: {
    data?: SelectedCurrencyI;
  };
  getSelectedCurrency: any;
}

const Header: React.FC<PropsI> = (props) => {
  const {
    setIsNightMode,
    getAllCurrenciesData,
    isNightMode,
    getSelectedCurrencydata,
    getSelectedCurrency,
  } = props;
  const [currentCurrency, setCurrentCurrency] = useState<
    Partial<SelectedCurrencyI> | undefined
  >({});

  useEffect(() => {
    setCurrentCurrency(getSelectedCurrencydata?.data);
  }, [getSelectedCurrencydata]);

  const handleChange = async (data: SelectedCurrencyI) => {
    await getSelectedCurrency(data);
  };

  return (
    <div className="header1container fadeInUp">
      <div className="header1headings">
        <h1>Crypto DashBoard</h1>
        <div className="header1RightCol">
          <CustomSelect
            dataList={getAllCurrenciesData?.currencies || []}
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
