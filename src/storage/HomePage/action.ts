import axios from "axios";
import * as actionTypes from "./actionType";
import { Dispatch } from "react";
import { headersOptions } from "../../utils/headers";

export const getAllCoins =
  (countryId: string = "6mUvpzCc2lFo") =>
  async (dispatch: Dispatch<actionTypes.actionTypePayloadType>) => {
    dispatch({
      type: actionTypes.GET_ALL_COINS_DATA,
    });
    try {
      const response = await axios.get(
        `https://api.coinranking.com/v2/coins?limit=100&referenceCurrencyUuid=${countryId}`
      );
      dispatch({
        type: actionTypes.GET_ALL_COINS_DATA_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_COINS_DATA_FAILED,
      });
    }
  };

export const getAllCurrencies =
  () => async (dispatch: Dispatch<actionTypes.AllCurrenciesPayloadType>) => {
    dispatch({
      type: actionTypes.GET_ALL_CURRIENCES,
    });
    try {
      const response = await axios.get(
        `https://api.coinranking.com/v2/reference-currencies?types[]=fiat&limit=20`
      );
      dispatch({
        type: actionTypes.GET_ALL_CURRIENCES_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_CURRIENCES_FAILED,
      });
    }
  };

export const getAllCachedCurrencies =
  (data: any) =>
  async (dispatch: Dispatch<actionTypes.AllCurrenciesPayloadType>) => {
    dispatch({
      type: actionTypes.GET_ALL_CURRIENCES_SUCCESS,
      payload: {
        data: JSON.parse(data),
      },
    });
  };

export const getSelectedCurrency =
  (data: any) =>
  async (dispatch: Dispatch<actionTypes.getSelectedCurrencyPayloadType>) => {
    dispatch({
      type: actionTypes.GET_SELECTED_CURRENCY_SUCCESS,
      payload: {
        data,
      },
    });
  };
