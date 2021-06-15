import axios from "axios";
import * as actionTypes from "./actionType";
import { Dispatch } from "react";
import useAxios from "../../api";

export const getCoinDataById =
  (uuid: string, countryId: string = "6mUvpzCc2lFo") =>
  async (dispatch: Dispatch<actionTypes.getCoinPayloadType>) => {
    dispatch({
      type: actionTypes.GET_COIN_DATA,
    });
    const response = await useAxios({
      url: `coin/${uuid}?referenceCurrencyUuid=${countryId}`,
      method: "GET",
    });
    if (!response.isError) {
      dispatch({
        type: actionTypes.GET_COIN_DATA_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } else {
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
    const response = await useAxios({
      url: `coin/${uuid}/markets?referenceCurrencyUuid=${countryId}`,
      method: "GET",
    });
    if (!response.isError) {
      dispatch({
        type: actionTypes.GET_COIN_MARKETS_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } else {
      dispatch({
        type: actionTypes.GET_COIN_MARKETS_FAILED,
      });
    }
  };
