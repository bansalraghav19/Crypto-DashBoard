import axios from "axios";
import * as actionTypes from "./actionType";
import { Dispatch } from "react";
import { headersOptions } from "../../utils/headers";
import useAxios from "../../api";

export const getAllCoins =
  (countryId: string = "6mUvpzCc2lFo") =>
  async (dispatch: Dispatch<actionTypes.actionTypePayloadType>) => {
    dispatch({
      type: actionTypes.GET_ALL_COINS_DATA,
    });
    const response = await useAxios({
      url: `coins?limit=100&referenceCurrencyUuid=${countryId}`,
      method: "GET",
    });
    if (!response.isError) {
      dispatch({
        type: actionTypes.GET_ALL_COINS_DATA_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } else {
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
    const response = await useAxios({
      url: "reference-currencies?types[]=fiat&limit=20",
      method: "GET",
    });
    if (!response.isError) {
      dispatch({
        type: actionTypes.GET_ALL_CURRIENCES_SUCCESS,
        payload: {
          data: response?.data?.data,
        },
      });
    } else {
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
        data: data,
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
