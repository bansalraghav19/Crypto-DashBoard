import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://api.coinranking.com/v2/",
  headers: {
    "x-access-token":
      "coinranking5714c4e757c60c495bcc48c4b16affded376bcd126946433",
  },
});

const useAxios = (
  axiosParams: AxiosParams & AxiosRequestConfig
): Promise<Response> => {
  return new Promise(async (resolve) => {
    try {
      const response = await instance.request(axiosParams);
      resolve({ data: response.data, isError: false });
    } catch (error) {
      resolve({ isError: true });
    }
  });
};

interface AxiosParams {
  method: string;
  data?: any;
}

interface Response {
  isError: boolean;
  data?: any;
}

export default useAxios;
