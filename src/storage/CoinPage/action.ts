import axios from "axios";
import * as actionTypes from "./actionType";
import { Dispatch } from "react";

export const getCoinDataById =
  (uuid: string, countryId: string = "6mUvpzCc2lFo") =>
  async (dispatch: Dispatch<actionTypes.getCoinPayloadType>) => {
    dispatch({
      type: actionTypes.GET_COIN_DATA,
    });
    try {
      const response = await axios.get(
        `https://api.coinranking.com/v2/coin/${uuid}?referenceCurrencyUuid=${countryId}`
      );
      dispatch({
        type: actionTypes.GET_COIN_DATA_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_COIN_DATA_FAILED,
      });
    }
  };

export const getCoinMarkets =
  (uuid: string, countryId: string = "6mUvpzCc2lFo") =>
  async (dispatch: Dispatch<actionTypes.getCoinMarketsPayloadType>) => {
    dispatch({
      type: actionTypes.GET_COIN_MARKETS,
    });
    try {
      const response = await axios.get(
        `https://api.coinranking.com/v2/coin/${uuid}/markets?referenceCurrencyUuid=${countryId}`
      );
      dispatch({
        type: actionTypes.GET_COIN_MARKETS_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_COIN_MARKETS_FAILED,
      });
    }
  };
