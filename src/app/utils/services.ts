import { z } from "zod";

import { postRequest, consoleLogError, errorAPIAlert } from "./axios-util";
import { errorToast } from "./toast-util";
import { apiCacheInst } from "./api-cache";

const cacheCollection = {
  getQueryByIdGroup: {
    name: "getQueryByIdGroup",
    limit: 30,
  },
};

apiCacheInst.setCappedCollection(
  cacheCollection.getQueryByIdGroup.name,
  cacheCollection.getQueryByIdGroup.limit
);

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

const pgSaveQuerySchema = z.object({
  partialId: z.string().optional(),
  title: z.string().optional(),
  customQuery: z.string(),
  categoryId: z.string().optional(),
  queryId: z.string().optional(),
});

const pgGetSavedQuerySchema = z.object({
  partialId: z.string(),
});
//#endregion

const API_PATHS = {
  pgGetQueryNavbarData: "/pgGetQueryNavbarData",
  pgGetQueryDataById: "/pgGetQueryDataById",
  pgGetDbIndexById: "/pgGetDbIndexById",
  pgGetSampleDataByDataSourceId: "/pgGetSampleDataByDataSourceId",
  pgRunQuery: "/pgRunQuery",
  pgSaveQuery: "/pgSaveQuery",
  pgGetSavedQuery: "/pgGetSavedQuery",
};

//#region API calls

const pgGetQueryNavbarData = async () => {
  const cacheKey = apiCacheInst.getCacheKey(API_PATHS.pgGetQueryNavbarData);
  let retValue = apiCacheInst.getApiCache(cacheKey);
  if (!retValue) {
    try {
      const response = await postRequest(API_PATHS.pgGetQueryNavbarData, {});
      retValue = response?.data;
      apiCacheInst.setApiCache(cacheKey, retValue);
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
  const cacheKey = apiCacheInst.getCacheKey(
    API_PATHS.pgGetQueryDataById,
    input.queryIds
  );
  let retValue = apiCacheInst.getApiCache(cacheKey);
  if (!retValue) {
    try {
      pgGetQueryDataByIdSchema.parse(input); // validate input

      const response = await postRequest(API_PATHS.pgGetQueryDataById, input);
      retValue = response?.data;
      apiCacheInst.setCappedApiCache(
        cacheCollection.getQueryByIdGroup.name,
        cacheKey,
        retValue
      );
    } catch (axiosError: any) {
      consoleLogError(axiosError);
      errorAPIAlert(API_PATHS.pgGetQueryDataById);
    }
  }

  return retValue;
};

const pgGetDbIndexById = async (
  input: z.infer<typeof pgGetDbIndexByIdSchema>
) => {
  const cacheKey = apiCacheInst.getCacheKey(
    API_PATHS.pgGetDbIndexById,
    input.dbIndexIds
  );
  let retValue = apiCacheInst.getApiCache(cacheKey);
  if (!retValue) {
    try {
      pgGetDbIndexByIdSchema.parse(input); // validate input

      const response = await postRequest(API_PATHS.pgGetDbIndexById, input);
      retValue = response?.data;
      apiCacheInst.setApiCache(cacheKey, retValue);
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
  const cacheKey = apiCacheInst.getCacheKey(
    API_PATHS.pgGetSampleDataByDataSourceId,
    [input.dataSourceId]
  );
  let retValue = apiCacheInst.getApiCache(cacheKey);
  if (!retValue) {
    try {
      pgGetSampleDataByDataSourceIdSchema.parse(input); // validate input

      const response = await postRequest(
        API_PATHS.pgGetSampleDataByDataSourceId,
        input
      );

      retValue = response?.data;
      apiCacheInst.setApiCache(cacheKey, retValue);
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
    userId: "",
  };

  try {
    pgRunQuerySchema.parse(input); // validate input

    const response = await postRequest(API_PATHS.pgRunQuery, input);
    const responseData = response?.data?.data;
    if (responseData) {
      testResult.data = responseData.queryResult;
      testResult.userId = responseData.userId;
    }

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

const pgSaveQuery = async (input: z.infer<typeof pgSaveQuerySchema>) => {
  let retValue: any;

  try {
    pgSaveQuerySchema.parse(input); // validate input

    const response = await postRequest(API_PATHS.pgSaveQuery, input);
    retValue = response?.data;
  } catch (axiosError: any) {
    const error = consoleLogError(axiosError);
    if (error?.userMessage) {
      errorToast(error.userMessage);
    } else {
      errorAPIAlert(API_PATHS.pgSaveQuery);
    }
  }

  return retValue;
};

const pgGetSavedQuery = async (
  input: z.infer<typeof pgGetSavedQuerySchema>
) => {
  let retValue: any;

  try {
    pgGetSavedQuerySchema.parse(input); // validate input

    const response = await postRequest(API_PATHS.pgGetSavedQuery, input);
    retValue = response?.data;
  } catch (axiosError: any) {
    const error = consoleLogError(axiosError);
    if (error?.userMessage) {
      errorToast(error.userMessage);
    } else {
      errorAPIAlert(API_PATHS.pgGetSavedQuery);
    }
  }

  return retValue;
};
//#endregion

export {
  API_PATHS,
  pgGetQueryNavbarData,
  pgGetQueryDataById,
  pgGetDbIndexById,
  pgGetSampleDataByDataSourceId,
  pgRunQuery,
  pgSaveQuery,
  pgGetSavedQuery,
};
