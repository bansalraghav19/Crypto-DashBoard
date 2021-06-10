export const GET_ALL_COINS_DATA = "GET_ALL_COINS_DATA";
export const GET_ALL_COINS_DATA_SUCCESS = `GET_ALL_COINS_DATA.SUCCESS`;
export const GET_ALL_COINS_DATA_FAILED = `GET_ALL_COINS_DATA.FAILED`;

export const GET_ALL_CURRIENCES = "GET_ALL_CURRIENCES";
export const GET_ALL_CURRIENCES_SUCCESS = `GET_ALL_CURRIENCES.SUCCESS`;
export const GET_ALL_CURRIENCES_FAILED = `GET_ALL_CURRIENCES.FAILED`;

export const GET_SELECTED_CURRENCY = "GET_SELECTED_CURRENCY";
export const GET_SELECTED_CURRENCY_SUCCESS = `GET_SELECTED_CURRENCY.SUCCESS`;
export const GET_SELECTED_CURRENCY_FAILED = `GET_SELECTED_CURRENCY.FAILED`;

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

export type getAllCoinsI = payloadInterface<coinsI[]>;
export type actionTypePayloadType =
  | suceessInterface<
      typeof GET_ALL_COINS_DATA_SUCCESS,
      payloadInterface<getAllCoinsI>
    >
  | loadingInterface<typeof GET_ALL_COINS_DATA>
  | failedInterface<typeof GET_ALL_COINS_DATA_FAILED>;

export type getAllCurrencies = payloadInterface<any>;
export type AllCurrenciesPayloadType =
  | suceessInterface<
      typeof GET_ALL_CURRIENCES_SUCCESS,
      payloadInterface<getAllCoinsI>
    >
  | loadingInterface<typeof GET_ALL_CURRIENCES>
  | failedInterface<typeof GET_ALL_CURRIENCES_FAILED>;

export type getSelectedCurrencyI = payloadInterface<any>;
export type getSelectedCurrencyPayloadType =
  | suceessInterface<
      typeof GET_SELECTED_CURRENCY_SUCCESS,
      payloadInterface<getAllCoinsI>
    >
  | loadingInterface<typeof GET_SELECTED_CURRENCY>
  | failedInterface<typeof GET_SELECTED_CURRENCY_FAILED>;
