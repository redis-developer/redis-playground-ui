import type {
  IQueryViewData,
  IQueryTemplateData,
  ISelectedQuery,
  IQueryResponse,
  IQueryTemplateItem,
} from "@/app/types";

import { useState } from "react";
import { pgGetQueryNavbarData } from "../utils/services";
import BrowserCache from "../utils/browser-cache";

const TOUR_COMPLETED_KEY = "pgTourCompleted";

const usePlayground = () => {
  const [apiCallInProgress, setApiCallInProgress] = useState(0);

  const [queryTemplateData, setQueryTemplateData] = useState<
    IQueryTemplateData[]
  >([]);

  const [selectedQuery, setSelectedQuery] = useState<ISelectedQuery | null>(
    null
  );
  const [queryViewData, setQueryViewData] = useState<IQueryViewData | null>(
    null
  );
  const [customQuery, setCustomQuery] = useState<string>("");

  const [queryResponse, setQueryResponse] = useState<IQueryResponse | null>(
    null
  );

  const fnIsTourCompleted = () => {
    return BrowserCache.getItem(TOUR_COMPLETED_KEY) === "true";
  };
  const [runTour, setRunTour] = useState(!fnIsTourCompleted());

  const fnSetTourCompleted = (isCompleted: boolean) => {
    if (isCompleted) {
      BrowserCache.setItem(TOUR_COMPLETED_KEY, "true");
    } else {
      BrowserCache.removeItem(TOUR_COMPLETED_KEY);
    }
  };

  const fnGetSelectedQueryTemplate = () => {
    let result: {
      template?: IQueryTemplateData;
      query?: IQueryTemplateItem;
    } | null = null;

    if (selectedQuery && queryTemplateData) {
      const resultCategory = queryTemplateData.find(
        (item) => item.categoryId === selectedQuery.categoryId
      );
      if (resultCategory) {
        const resultQuery = resultCategory.items.find(
          (item) => item.queryId === selectedQuery.queryId
        );
        result = { template: resultCategory, query: resultQuery };
      }
    }
    return result;
  };

  const fnLoadQueryTemplateData = async () => {
    let retData: IQueryTemplateData[] = queryTemplateData;
    if (queryTemplateData?.length === 0) {
      setApiCallInProgress((prev) => prev + 1);
      const result = await pgGetQueryNavbarData();
      if (result?.data?.length > 0) {
        setQueryTemplateData(result?.data);
        retData = result?.data;
      }
      setApiCallInProgress((prev) => prev - 1);
    }

    return retData;
  };

  return {
    queryTemplateData,
    setQueryTemplateData,
    selectedQuery,
    setSelectedQuery,
    queryViewData,
    setQueryViewData,
    customQuery,
    setCustomQuery,
    queryResponse,
    setQueryResponse,
    apiCallInProgress,
    setApiCallInProgress,
    runTour,
    setRunTour,

    fnLoadQueryTemplateData,
    fnGetSelectedQueryTemplate,
    fnIsTourCompleted,
    fnSetTourCompleted,
  };
};

export { usePlayground };

export type { IQueryTemplateData };
