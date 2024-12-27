import { z } from "zod";

import { postRequest, consoleLogError, errorAPIAlert } from "./axios-util";
import { errorToast } from "./toast-util";

const apiCache: Record<string, any> = {};

const getCacheKey = (prefixKey: string, suffixArr?: string[]) => {
  let retValue = prefixKey;
  if (suffixArr && suffixArr.length > 0) {
    retValue = `${prefixKey}-${suffixArr.join("-")}`;
  }
  return retValue;
};

const getApiCache = (cacheKey: string) => {
  let cacheValue = null;
  if (apiCache[cacheKey]) {
    cacheValue = apiCache[cacheKey];
  }
  return cacheValue;
};

const setApiCache = (cacheKey: string, cacheValue: any) => {
  if (cacheKey && cacheValue) {
    apiCache[cacheKey] = cacheValue;
  }
};

//#region API input schema

const pgGetQueryDataByIdSchema = z.object({
  queryIds: z.string().array(),
});

const pgGetDbIndexByIdSchema = z.object({
  isAll: z.boolean().optional(),
  dbIndexIds: z.string().array(),
});

const pgGetSampleDataByDataSourceIdSchema = z.object({
  dataSourceId: z.string(),
  dataCount: z.number(),
});

const pgRunQuerySchema = z.object({
  customQuery: z.string().optional(),
  queryId: z.string().optional(),
});
//#endregion

const API_PATHS = {
  pgGetQueryNavbarData: "/pgGetQueryNavbarData",
  pgGetQueryDataById: "/pgGetQueryDataById",
  pgGetDbIndexById: "/pgGetDbIndexById",
  pgGetSampleDataByDataSourceId: "/pgGetSampleDataByDataSourceId",
  pgRunQuery: "/pgRunQuery",
};

//#region API calls

const pgGetQueryNavbarData = async () => {
  const cacheKey = getCacheKey(API_PATHS.pgGetQueryNavbarData);
  let retValue = getApiCache(cacheKey);
  if (!retValue) {
    try {
      const response = await postRequest(API_PATHS.pgGetQueryNavbarData, {});
      retValue = response?.data;
      setApiCache(cacheKey, retValue);
    } catch (axiosError: any) {
      consoleLogError(axiosError);
      errorAPIAlert(API_PATHS.pgGetQueryNavbarData);
    }
  }

  return retValue;
};

const pgGetQueryDataById = async (
  input: z.infer<typeof pgGetQueryDataByIdSchema>
) => {
  try {
    pgGetQueryDataByIdSchema.parse(input); // validate input

    const response = await postRequest(API_PATHS.pgGetQueryDataById, input);
    return response?.data;
  } catch (axiosError: any) {
    consoleLogError(axiosError);
    errorAPIAlert(API_PATHS.pgGetQueryDataById);
  }
};

const pgGetDbIndexById = async (
  input: z.infer<typeof pgGetDbIndexByIdSchema>
) => {
  const cacheKey = getCacheKey(API_PATHS.pgGetDbIndexById, input.dbIndexIds);
  let retValue = getApiCache(cacheKey);
  if (!retValue) {
    try {
      pgGetDbIndexByIdSchema.parse(input); // validate input

      const response = await postRequest(API_PATHS.pgGetDbIndexById, input);
      retValue = response?.data;
      setApiCache(cacheKey, retValue);
    } catch (axiosError: any) {
      consoleLogError(axiosError);
      errorAPIAlert(API_PATHS.pgGetDbIndexById);
    }
  }

  return retValue;
};

const pgGetSampleDataByDataSourceId = async (
  input: z.infer<typeof pgGetSampleDataByDataSourceIdSchema>
) => {
  const cacheKey = getCacheKey(API_PATHS.pgGetSampleDataByDataSourceId, [
    input.dataSourceId,
  ]);
  let retValue = getApiCache(cacheKey);
  if (!retValue) {
    try {
      pgGetSampleDataByDataSourceIdSchema.parse(input); // validate input

      const response = await postRequest(
        API_PATHS.pgGetSampleDataByDataSourceId,
        input
      );

      retValue = response?.data;
      setApiCache(cacheKey, retValue);
    } catch (axiosError: any) {
      consoleLogError(axiosError);
      errorAPIAlert(API_PATHS.pgGetSampleDataByDataSourceId);
    }
  }

  return retValue;
};

const pgRunQuery = async (input: z.infer<typeof pgRunQuerySchema>) => {
  const testResult: any = {
    data: null,
    error: null,
  };

  try {
    pgRunQuerySchema.parse(input); // validate input

    const response = await postRequest(API_PATHS.pgRunQuery, input);
    testResult.data = response?.data?.data;

    if (!testResult.data) {
      throw new Error("No data found");
    }
  } catch (axiosError: any) {
    const error = consoleLogError(axiosError);
    if (error?.userMessage) {
      errorToast(error.userMessage);
    } else {
      //errorAPIAlert(API_PATHS.pgRunQuery);
    }
    testResult.error = error?.message || error; // message, stack
  }

  return testResult;
};
//#endregion

export {
  API_PATHS,
  pgGetQueryNavbarData,
  pgGetQueryDataById,
  pgGetDbIndexById,
  pgGetSampleDataByDataSourceId,
  pgRunQuery,
};
