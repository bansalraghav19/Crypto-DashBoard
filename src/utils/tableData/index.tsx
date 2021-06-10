import { numberToWords } from "../commonFunctions";
import {
  HomePageTableInterface,
  CoinPageTableInterface,
} from "../dataInterfaces";
import { sortedByNumber, sortedLexographically } from "../commonFunctions";

const sortNumber = (
  initialArray: any,
  fieldName: string,
  increasing: boolean
) => sortedByNumber(initialArray, fieldName, increasing);

const sortString = (
  initialArray: any,
  fieldName: string,
  increasing: boolean
) => sortedLexographically(initialArray, fieldName, increasing);

export const homePageTableColumns = [
  {
    key: "rank",
    name: "Rank",
    render: (row: HomePageTableInterface) => (
      <span>{numberToWords(row.rank)}</span>
    ),
    sortingFunction: sortNumber,
  },
  {
    key: "name",
    name: "Name",
    render: (row: HomePageTableInterface) => (
      <>
        <span className="mr-10">
          <img src={row?.iconUrl} />
        </span>
        <span className="mr-5">{row?.name}</span>
        <span> {`(${row?.symbol})`}</span>
      </>
    ),
    sortingFunction: sortString,
  },
  {
    key: "price",
    name: "Price",
    render: (row: HomePageTableInterface, currency: string) => {
      const delta = numberToWords(row?.change);
      return (
        <div>
          {!isNaN(Number(delta)) && (
            <div
              className="tc1pricebox mb-10"
              style={{
                color: parseInt(delta) >= 0 ? "green" : "red",
              }}
            >
              <span className="mr-5">{delta}%</span>
              <span>
                <i
                  className={`fal fa-arrow-${
                    parseInt(delta) >= 0 ? "up" : "down"
                  }`}
                ></i>
              </span>
            </div>
          )}
          <div>
            {currency || ""}
            {numberToWords(row?.price)}
          </div>
        </div>
      );
    },
    sortingFunction: sortNumber,
  },
  {
    key: "change",
    name: "Change",
    render: (row: HomePageTableInterface) => {
      const delta = numberToWords(row?.change);
      return (
        <div
          className="tc1pricebox"
          style={{
            color: parseInt(delta) >= 0 ? "green" : "red",
          }}
        >
          <span className="mr-5">{delta}%</span>
          <span>
            <i
              className={`fal fa-arrow-${parseInt(delta) >= 0 ? "up" : "down"}`}
            ></i>
          </span>
        </div>
      );
    },
    sortingFunction: sortNumber,
  },
  {
    key: "marketCap",
    name: "Market Cap.",
    render: (row: HomePageTableInterface, currency?: string) => (
      <span>
        {currency}
        {numberToWords(row?.marketCap)}
      </span>
    ),
    sortingFunction: sortNumber,
  },
  {
    key: "btcPrice",
    name: "BTC Price",
    render: (row: HomePageTableInterface) => (
      <span>{numberToWords(row?.btcPrice)}</span>
    ),
    sortingFunction: sortNumber,
  },
];

export const coinPageTableColumns = [
  {
    key: "rank",
    name: "Rank",
    render: (row: CoinPageTableInterface) => (
      <span>{numberToWords(row.rank)}</span>
    ),
    sortingFunction: sortNumber,
  },
  {
    key: "source",
    name: "Source",
    render: (row: CoinPageTableInterface) => (
      <>
        <span className="mr-10">
          <img src={row?.exchange?.iconUrl} />
        </span>
        <span className="mr-5">{row?.exchange?.name}</span>
      </>
    ),
    sortingFunction: (
      initialArray: any,
      fieldName: string,
      increasing: boolean
    ) => {
      const copyArray = [...initialArray];
      copyArray.sort((a, b) => {
        const stringA = a.exchange.name;
        const stringB = b.exchange.name;
        return increasing
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      });
      return copyArray;
    },
  },
  {
    key: "pairs",
    name: "Pairs",
    render: (row: CoinPageTableInterface) => (
      <span>
        {row?.base?.symbol} / {row?.quote?.symbol}
      </span>
    ),
    sortingFunction: (
      initialArray: any,
      fieldName: string,
      increasing: boolean
    ) => {
      const copyArray = [...initialArray];
      copyArray.sort((a, b) => {
        const stringA = `${a.base.symbol}${a.quote.symbol}`;
        const stringB = `${b.base.symbol}${b.quote.symbol}`;
        return increasing
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      });
      return copyArray;
    },
  },
  {
    key: "price",
    name: "Price",
    render: (row: CoinPageTableInterface, currency: string) => {
      const delta = numberToWords(row?.change);
      return (
        <div>
          {!isNaN(Number(delta)) && (
            <div
              className="tc1pricebox mb-10"
              style={{
                color: parseInt(delta) >= 0 ? "green" : "red",
              }}
            >
              <span className="mr-5">{delta}%</span>
              <span>
                <i
                  className={`fal fa-arrow-${
                    parseInt(delta) >= 0 ? "up" : "down"
                  }`}
                ></i>
              </span>
            </div>
          )}
          <div>
            {currency || ""}
            {numberToWords(row.price)}
          </div>
        </div>
      );
    },
    sortingFunction: sortNumber,
  },
  {
    key: "24hVolume",
    name: "Volume (24H)",
    render: (row: CoinPageTableInterface, currency?: string) => (
      <span>
        {currency || ""}
        {numberToWords(row?.["24hVolume"])}
      </span>
    ),
    sortingFunction: sortNumber,
  },
  {
    key: "marketShare",
    name: "Volume %",
    render: (row: CoinPageTableInterface) => (
      <span>{numberToWords(row?.marketShare)}</span>
    ),
    sortingFunction: sortNumber,
  },
  {
    key: "btcPrice",
    name: "BTC Price",
    render: (row: CoinPageTableInterface) => (
      <span>{numberToWords(row?.btcPrice)}</span>
    ),
    sortingFunction: sortNumber,
  },
];
