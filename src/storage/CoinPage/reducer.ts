import { combineReducers } from "redux";
import * as Types from "./actionType";

interface initialStateI<T> {
  data: T;
  error: boolean;
  isLoading: boolean;
}

const createReducer = <S>(actionType: any) => {
  const initialState: initialStateI<Partial<S>> = {
    data: {},
    error: false,
    isLoading: false,
  };

  return (state: any = initialState, action: any): any => {
    switch (action.type) {
      case actionType:
        return {
          ...state,
          isLoading: true,
        };
      case `${actionType}.SUCCESS`:
        return {
          ...state,
          isLoading: false,
          data: action.payload.data,
          error: false,
        };
      case `${actionType}.FAILED`:
        return {
          ...state,
          isLoading: false,
          error: true,
        };
      default:
        return state;
    }
  };
};

export default combineReducers({
  getCoinById: createReducer<Types.getCoinsI>(Types.GET_COIN_DATA),
  getCoinMarkets: createReducer<Types.getCoinMarketI>(Types.GET_COIN_MARKETS),
});
