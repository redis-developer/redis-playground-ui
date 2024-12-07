import { fetchServerVariables } from "./utils/axios-util";

interface IConfig {
  data: {
    FROM_DOCKER?: string;
    DEFAULT_REDIS_URL?: string;
    GIT_TAG?: string;
    API_BASE_URL?: string;
    SOCKET_IO_URL?: string;
    ENCRYPTION_KEY?: string;
  };
}

const config: IConfig = {
  data: {},
};

const setConfigData = async () => {
  const serverVars: any = await fetchServerVariables();
  if (serverVars) {
    const ENV_VARS = {
      PLAYGROUND_END_POINT: serverVars.PLAYGROUND_END_POINT || "",
      ENCRYPTION_KEY: serverVars.PLAYGROUND_ENCRYPTION_KEY || "",
      FROM_DOCKER: serverVars.PLAYGROUND_FROM_DOCKER || "",
    };

    config.data = {
      FROM_DOCKER: ENV_VARS.FROM_DOCKER,
      DEFAULT_REDIS_URL:
        ENV_VARS.FROM_DOCKER === "Y"
          ? "redis://host.docker.internal:6379"
          : "redis://localhost:6379",
      GIT_TAG: "v0.1.0",
      API_BASE_URL: `${ENV_VARS.PLAYGROUND_END_POINT}/api`,
      SOCKET_IO_URL: `${ENV_VARS.PLAYGROUND_END_POINT}/`,
      ENCRYPTION_KEY: ENV_VARS.ENCRYPTION_KEY,
    };
  }

  return config.data;
};

const getConfigData = () => {
  return config.data;
};

export { getConfigData, setConfigData };
