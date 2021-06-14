import React, { memo } from "react";
import { connect } from "react-redux";
import { colors } from "../../utils/colors";
import { cardsData } from "../../utils/contansts";
import { StoreInterface } from "../../storage/store";
import "./style.css";
import { numberToWords } from "../../utils/commonFunctions";

interface CardI {
  heading: string;
  count: number;
  color: string;
  background: string;
  isCurrency: boolean;
  [key: string]: any;
}

interface customCSS extends React.CSSProperties {
  "--active-color": string;
  "--active-background": string;
}

const Card = ({
  heading,
  count,
  color,
  background,
  isCurrency,
  currencySign,
}: CardI) => {
  const style = {
    "--active-color": color,
    "--active-background": background,
  };
  return (
    <div style={style as customCSS} className="cd1container fadeInUp">
      <p className="cd1heading">{heading.toUpperCase()}</p>
      <p className="cd1count">
        {isCurrency ? <span>{currencySign || ""}</span> : ""}
        {numberToWords(count)}
      </p>
    </div>
  );
};

const CardWrapper = (props: any) => {
  return (
    <div className="cw1container">
      {cardsData?.map((card, index) =>
        props?.dataList?.[card.key] ? (
          <Card
            key={card?.key}
            background={colors[index % colors.length].background}
            color={colors[index % colors.length].color}
            heading={card.name}
            count={props?.dataList?.[card?.key]}
            isCurrency={card.isCurrency}
            currencySign={props?.getSelectedCurrencydata?.data?.sign}
          />
        ) : (
          <span key={card?.key}></span>
        )
      )}
    </div>
  );
};

const mapStateToProps = (store: StoreInterface) => ({
  getSelectedCurrencydata: store?.homePage?.getSelectedCurrency,
});

export default connect(mapStateToProps, {})(memo(CardWrapper));
