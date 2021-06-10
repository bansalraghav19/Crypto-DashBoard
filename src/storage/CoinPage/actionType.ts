export const GET_COIN_DATA = "GET_COIN_DATA";
export const GET_COIN_DATA_SUCCESS = `GET_COIN_DATA.SUCCESS`;
export const GET_COIN_DATA_FAILED = `GET_COIN_DATA.FAILED`;

export const GET_COIN_MARKETS = "GET_COIN_MARKETS";
export const GET_COIN_MARKETS_SUCCESS = `GET_COIN_MARKETS.SUCCESS`;
export const GET_COIN_MARKETS_FAILED = `GET_COIN_MARKETS.FAILED`;

interface loadingInterface<T> {
  type: T;
}

interface suceessInterface<T, S> {
  type: T;
  payload: {
    data: S;
  };
}

interface failedInterface<T> {
  type: T;
}

interface coinsI {
  color: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  btcPrice: number;
  [key: string]: any;
}

interface payloadInterface<T> {
  coins: T;
  [key: string]: any;
}

export type getCoinsI = payloadInterface<any>;
export type getCoinPayloadType =
  | suceessInterface<typeof GET_COIN_DATA_SUCCESS, payloadInterface<getCoinsI>>
  | loadingInterface<typeof GET_COIN_DATA>
  | failedInterface<typeof GET_COIN_DATA_FAILED>;

export type getCoinMarketI = payloadInterface<any>;
export type getCoinMarketsPayloadType =
  | suceessInterface<
      typeof GET_COIN_MARKETS_SUCCESS,
      payloadInterface<getCoinsI>
    >
  | loadingInterface<typeof GET_COIN_MARKETS>
  | failedInterface<typeof GET_COIN_MARKETS_FAILED>;
