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

//#endregion

const API_PATHS = {
  testRedisConnection: "/testRedisConnection",
  pgGetQueryNavbarData: "/pgGetQueryNavbarData",
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
//#endregion

export { API_PATHS, testRedisConnection, pgGetQueryNavbarData };
