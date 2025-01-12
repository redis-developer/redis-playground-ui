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
  items: IQueryTemplateItem[];
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

interface ISavedQueryData {
  title?: string;
  customQuery?: string;
  category?: string;
  queryId?: string;
}

export type {
  IQueryViewData,
  IQueryTemplateData,
  IQueryTemplateItem,
  ISelectedQuery,
  IQueryResponse,
  ISavedQueryData,
};
