import { z } from "zod";

import { postRequest, consoleLogError, errorAPIAlert } from "./axios-util";
import { errorToast } from "./toast-util";

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
  try {
    const response = await postRequest(API_PATHS.pgGetQueryNavbarData, {});
    return response?.data;
  } catch (axiosError: any) {
    consoleLogError(axiosError);
    errorAPIAlert(API_PATHS.pgGetQueryNavbarData);
  }
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
  try {
    pgGetDbIndexByIdSchema.parse(input); // validate input

    const response = await postRequest(API_PATHS.pgGetDbIndexById, input);
    return response?.data;
  } catch (axiosError: any) {
    consoleLogError(axiosError);
    errorAPIAlert(API_PATHS.pgGetDbIndexById);
  }
};

const pgGetSampleDataByDataSourceId = async (
  input: z.infer<typeof pgGetSampleDataByDataSourceIdSchema>
) => {
  try {
    pgGetSampleDataByDataSourceIdSchema.parse(input); // validate input

    const response = await postRequest(
      API_PATHS.pgGetSampleDataByDataSourceId,
      input
    );
    return response?.data;
  } catch (axiosError: any) {
    consoleLogError(axiosError);
    errorAPIAlert(API_PATHS.pgGetSampleDataByDataSourceId);
  }
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
