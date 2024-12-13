import { z } from "zod";

import { postRequest, consoleLogError, errorAPIAlert } from "./axios-util";
import { errorToast } from "./toast-util";

//#region API input schema
const zodEncryptedData = z.object({
  encryptedData: z.string(),
  iv: z.string(),
  authTag: z.string(),
});

const testRedisConnectionSchema = z.object({
  redisConUrlEncrypted: zodEncryptedData,
});

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

//#endregion

const API_PATHS = {
  testRedisConnection: "/testRedisConnection",
  pgGetQueryNavbarData: "/pgGetQueryNavbarData",
  pgGetQueryDataById: "/pgGetQueryDataById",
  pgGetDbIndexById: "/pgGetDbIndexById",
  pgGetSampleDataByDataSourceId: "/pgGetSampleDataByDataSourceId",
};

//#region API calls
const testRedisConnection = async (
  input: z.infer<typeof testRedisConnectionSchema>
) => {
  try {
    testRedisConnectionSchema.parse(input); // validate input

    const response = await postRequest(API_PATHS.testRedisConnection, input);
    return response?.data;
  } catch (axiosError: any) {
    consoleLogError(axiosError);
    errorAPIAlert(API_PATHS.testRedisConnection);
  }
};

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
//#endregion

export {
  API_PATHS,
  testRedisConnection,
  pgGetQueryNavbarData,
  pgGetQueryDataById,
  pgGetDbIndexById,
  pgGetSampleDataByDataSourceId,
};
