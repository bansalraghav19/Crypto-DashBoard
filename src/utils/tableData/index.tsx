import { numberToWords } from "../commonFunctions";
import {
  HomePageTableInterface,
  CoinPageTableInterface,
} from "../dataInterfaces";
import { sortedByNumber, sortedLexographically } from "../commonFunctions";

export const homePageTableColumns = [
  {
    key: "rank",
    name: "Rank",
    render: (row: HomePageTableInterface) => (
      <span>{numberToWords(row.rank)}</span>
    ),
    sortingFunction: sortedByNumber,
  },
  {
    key: "name",
    name: "Name",
    render: (row: HomePageTableInterface) => (
      <>
        <span className="mr-10">
          <img src={row?.iconUrl} alt="logo" />
        </span>
        <span className="mr-5">{row?.name}</span>
        <span> {`(${row?.symbol})`}</span>
      </>
    ),
    sortingFunction: sortedLexographically,
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
                color: Number(delta) < 0 ? "red" : "green",
              }}
            >
              <span className="mr-5">{delta}%</span>
              <span>
                <i
                  className={`fal fa-arrow-${
                    Number(delta) < 0 ? "down" : "up"
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
    sortingFunction: sortedByNumber,
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
            color: Number(delta) < 0 ? "red" : "green",
          }}
        >
          <span className="mr-5">{delta}%</span>
          <span>
            <i
              className={`fal fa-arrow-${Number(delta) < 0 ? "down" : "up"}`}
            ></i>
          </span>
        </div>
      );
    },
    sortingFunction: sortedByNumber,
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
    sortingFunction: sortedByNumber,
  },
  {
    key: "btcPrice",
    name: "BTC Price",
    render: (row: HomePageTableInterface) => (
      <span>{numberToWords(row?.btcPrice)}</span>
    ),
    sortingFunction: sortedByNumber,
  },
];

export const coinPageTableColumns = [
  {
    key: "rank",
    name: "Rank",
    render: (row: CoinPageTableInterface) => (
      <span>{numberToWords(row.rank)}</span>
    ),
    sortingFunction: sortedByNumber,
  },
  {
    key: "source",
    name: "Source",
    render: (row: CoinPageTableInterface) => (
      <>
        <span className="mr-10">
          <img src={row?.exchange?.iconUrl} alt="logo" />
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
      return (
        <div>
          <div>
            {currency || ""}
            {numberToWords(row.price)}
          </div>
        </div>
      );
    },
    sortingFunction: sortedByNumber,
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
    sortingFunction: sortedByNumber,
  },
  {
    key: "marketShare",
    name: "Volume %",
    render: (row: CoinPageTableInterface) => (
      <span>{numberToWords(row?.marketShare)}</span>
    ),
    sortingFunction: sortedByNumber,
  },
  {
    key: "btcPrice",
    name: "BTC Price",
    render: (row: CoinPageTableInterface) => (
      <span>{numberToWords(row?.btcPrice)}</span>
    ),
    sortingFunction: sortedByNumber,
  },
];
