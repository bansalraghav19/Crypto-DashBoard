import React, { useEffect, useState, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { StoreInterface } from "../../storage/store";
import CustomSelect from "../select";
import { getSelectedCurrency } from "../../storage/HomePage/action";
import { SelectedCurrencyI } from "../../utils/dataInterfaces";
import { Link } from "react-router-dom";
import Mode from "./Mode";
import "./style.css";

const Header: React.FC<Props> = (props) => {
  const { getAllCurrenciesData, getSelectedCurrencydata, getSelectedCurrency } =
    props;
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
        <Link to="/">
          <h1>Crypto DashBoard</h1>
        </Link>
        <div className="header1RightCol">
          <CustomSelect
            dataList={getAllCurrenciesData?.currencies || []}
            onChange={handleChange}
            currentCurrency={currentCurrency}
          />
          <Mode />
        </div>
      </div>
    </div>
  );
};

interface Props extends PropsFromRedux {}

const mapStateToProps = (store: StoreInterface) => ({
  getAllCurrenciesData: store?.homePage?.getAllCurrencies?.data,
  getSelectedCurrencydata: store?.homePage?.getSelectedCurrency,
});

const connector = connect(mapStateToProps, { getSelectedCurrency });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(memo(Header));
