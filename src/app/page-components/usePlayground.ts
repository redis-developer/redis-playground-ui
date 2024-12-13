import type { IQueryViewData } from "@/app/types";

import { useState } from "react";

const usePlayground = () => {
  const [selectedQueryId, setSelectedQueryId] = useState<string>("");
  const [queryViewData, setQueryViewData] = useState<IQueryViewData | null>(
    null
  );
  const [customQuery, setCustomQuery] = useState<string>("");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [queryError, setQueryError] = useState<any>(null);

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
  };
};

export { usePlayground };
