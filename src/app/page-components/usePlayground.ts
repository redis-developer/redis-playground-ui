import type { IQueryViewData } from "@/app/types";

import { useState } from "react";

const usePlayground = () => {
  const [selectedQueryId, setSelectedQueryId] = useState<string>("");
  const [queryViewData, setQueryViewData] = useState<IQueryViewData | null>(
    null
  );

  return {
    selectedQueryId,
    setSelectedQueryId,
    queryViewData,
    setQueryViewData,
  };
};

export { usePlayground };
