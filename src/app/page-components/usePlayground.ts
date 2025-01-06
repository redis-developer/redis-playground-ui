import type {
  IQueryViewData,
  IQueryTemplateData,
  ISelectedQuery,
  IQueryResponse,
  IQueryTemplateItem,
} from "@/app/types";

import { useState } from "react";

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

  const fnGetSelectedQueryTemplate = () => {
    let result: {
      template?: IQueryTemplateData;
      query?: IQueryTemplateItem;
    } | null = null;

    if (selectedQuery && queryTemplateData) {
      const resultCategory = queryTemplateData.find(
        (item) => item.category === selectedQuery.category
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

    fnGetSelectedQueryTemplate,
  };
};

export { usePlayground };

export type { IQueryTemplateData };
