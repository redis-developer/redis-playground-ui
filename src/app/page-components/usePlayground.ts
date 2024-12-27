import type {
  IQueryViewData,
  IQueryTemplateData,
  ISelectedQuery,
  IQueryResponse,
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
  };
};

export { usePlayground };

export type { IQueryTemplateData };
