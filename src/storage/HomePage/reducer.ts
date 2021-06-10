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

  return (state = initialState, action: any): any => {
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
  getAllCoinsData: createReducer<Types.getAllCoinsI>(Types.GET_ALL_COINS_DATA),
  getAllCurrencies: createReducer<Types.getAllCurrencies>(
    Types.GET_ALL_CURRIENCES
  ),
  getSelectedCurrency: createReducer<Types.getSelectedCurrencyI>(
    Types.GET_SELECTED_CURRENCY
  ),
});
