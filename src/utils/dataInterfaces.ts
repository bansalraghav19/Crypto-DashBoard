export interface HomePageTableInterface {
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  change: string;
  price: string;
  marketCap: string;
  btcPrice: string;
  symbol: string;
  [key: string]: any;
}

export interface CoinPageTableInterface {
  uuid: string;
  rank: number;
  exchange: {
    name: string;
    iconUrl: string;
    uuid: string;
  };
  base: {
    uuid: string;
    symbol: string;
  };
  quote: {
    uuid: string;
    symbol: string;
  };
  price: string;
  "24hVolume": string;
  marketShare: string;
  [key: string]: any;
}

export interface SelectedCurrencyI {
  iconUrl: string | null;
  name: string;
  sign: string | null;
  symbol: string | null;
  type: string;
  uuid: string;
}
