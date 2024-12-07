import axios, {
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { errorToast } from "./toast-util";
import { getConfigData } from "../config";

interface IApiResponse {
  data: any;
  error: any;
}
const CSS_CLASSES = {
  CUSTOM_ERROR_TOAST: "custom-error-toast",
};

let axiosInstance: AxiosInstance | null = null;

// #region helper functions
const consoleLogError = (axiosError: any) => {
  const error = axiosError?.response?.data?.error || axiosError;
  if (error) {
    console.error(error);
  }
  return error;
};

const errorAPIAlert = (apiName: string) => {
  if (!apiName.startsWith("/")) {
    apiName = `/${apiName}`;
  }
  errorToast(`Error in ${apiName} API, Check console for more info !`, {
    className: CSS_CLASSES.CUSTOM_ERROR_TOAST,
  });
};

const getAxiosInstance = () => {
  if (!axiosInstance) {
    const configData = getConfigData();
    if (configData.API_BASE_URL) {
      axiosInstance = axios.create({
        baseURL: configData.API_BASE_URL,
      });
    }
  }
  return axiosInstance;
};
// #endregion

const getRequest = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IApiResponse>> => {
  try {
    const axInst = getAxiosInstance();
    if (!axInst) {
      throw "getRequest() : Axios Instance is not available!";
    }
    const response = await axInst.get(url, config);
    return response;
  } catch (error) {
    console.error("getRequest error:", url, error);
    throw error;
  }
};

const postRequest = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IApiResponse>> => {
  try {
    const axInst = getAxiosInstance();
    if (!axInst) {
      throw "postRequest() : Axios Instance is not available!";
    }
    const response = await axInst.post(url, data, config);
    return response;
  } catch (error) {
    console.error("postRequest error:", url, error);
    throw error;
  }
};

const fetchServerVariables = async () => {
  const axiosInst = axios.create({
    baseURL: "/api",
  });

  try {
    const response = await axiosInst.post("/getServerVariables", {});
    return response.data;
  } catch (error) {
    console.error("fetchServerVariables NextJS API error:", error);
    throw error;
  }
};

export {
  getRequest,
  postRequest,
  consoleLogError,
  errorAPIAlert,
  fetchServerVariables,
};
