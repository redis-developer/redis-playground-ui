import { QueryResultFormat } from "./constants";

interface IQueryViewData {
  query: string;
  queryId?: string;
  dbIndexId: string;
  dataSourceId: string;
}

interface IQueryTemplateData {
  category: string;
  items: {
    queryId: string;
    label: string;
    description: string;
  }[];
}

interface ISelectedQuery {
  category: string;
  queryId: string;
}

interface IQueryResponse {
  executedQuery: string;
  result: any;
  error: any;
  matchLabel: string;
  resultFormatType: QueryResultFormat;
}

export type {
  IQueryViewData,
  IQueryTemplateData,
  ISelectedQuery,
  IQueryResponse,
};
