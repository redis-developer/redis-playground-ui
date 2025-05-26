import { DBSchema } from "idb";

import { QueryResultFormat } from "./constants";

interface IQueryViewData {
  query: string;
  queryId?: string;
  dbIndexId: string;
  dataSourceId: string;
}

interface IQueryTemplateItem {
  queryId: string;
  label: string;
  description: string;
}

interface IQueryTemplateData {
  category: string;
  categoryId: string;
  items: IQueryTemplateItem[];
}

interface ISelectedQuery {
  categoryId: string;
  queryId: string;
}

interface IQueryResponse {
  executedQuery: string;
  result: any;
  error: any;
  matchLabel: string;
  resultFormatType: QueryResultFormat;
}

interface ISavedQueryData {
  title?: string;
  customQuery?: string;
  categoryId?: string;
  queryId?: string;
}

//---- indexed db
interface IQueryHistory {
  hId: string;
  customQuery?: string;
  queryId?: string;
  query?: string;
  categoryId?: string;
  title?: string;
  createdOn?: string;
}

interface IQueryHistoryDB extends DBSchema {
  "query-history": {
    key: string; // hId
    value: IQueryHistory;
  };
}
//---- indexed db ends

export type {
  IQueryViewData,
  IQueryTemplateData,
  IQueryTemplateItem,
  ISelectedQuery,
  IQueryResponse,
  ISavedQueryData,
  IQueryHistory,
  IQueryHistoryDB,
};
