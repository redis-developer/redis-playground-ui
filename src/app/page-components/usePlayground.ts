import type { IQueryViewData } from "@/app/types";

import { useState } from "react";
import { QueryResultFormat } from "../constants";

const usePlayground = () => {
  const [selectedQueryId, setSelectedQueryId] = useState<string>("");
  const [queryViewData, setQueryViewData] = useState<IQueryViewData | null>(
    null
  );
  const [customQuery, setCustomQuery] = useState<string>("");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryError, setQueryError] = useState<any>(null);
  const [queryMatchLabel, setQueryMatchLabel] =
    useState<string>("NO RESULT FOUND");
  const [queryResultFormatType, setQueryResultFormatType] = useState(
    QueryResultFormat.string
  );

  return {
    selectedQueryId,
    setSelectedQueryId,
    queryViewData,
    setQueryViewData,
    customQuery,
    setCustomQuery,
    queryResult,
    setQueryResult,
    queryError,
    setQueryError,
    queryMatchLabel,
    setQueryMatchLabel,
    queryResultFormatType,
    setQueryResultFormatType,
  };
};

export { usePlayground };
