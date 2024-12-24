import type {
  IQueryViewData,
  IQueryTemplateData,
  ISelectedQuery,
  IQueryResponse,
} from "@/app/types";

import { useState } from "react";

const usePlayground = () => {
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
  };
};

export { usePlayground };

export type { IQueryTemplateData };
