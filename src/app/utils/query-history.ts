const queryHistoryData = [
  {
    hId: "1",
    customQuery: "",
    query: "FT.SEARCH 'pg:userSearchIndex' '@country:{INDIA} @gender:{F}'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_NUMERIC_RANGE",
  },
  {
    hId: "2",
    customQuery: "",
    query:
      "FT.SEARCH 'pg:userSearchIndex' '(@country:{AUSTRALIA}) | (@gender:{M})'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_MULTI_FIELD_OR_CONDITION",
  },
  {
    hId: "3",
    customQuery: "",
    query: `//Searches for products with price between 100 and 200
FT.SEARCH 'pg:fashionSearchIndex' '@price:[100 200]'
//Note: other examples
// - '@price:[1000 +inf]'  == price >= 1000
// - '@price:[(1000 +inf]' == price > 1000
// - '@price:[-inf 1000]' == price <= 1000
// - '@price:[-inf (1000]' == price < 1000`,
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_AGGREGATE",
    queryId: "JSON_AGGREGATE_GROUPBY_REDUCE_SUM",
  },
  {
    hId: "4",
    customQuery:
      "FT.SEARCH 'Prasan:pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    query: `// Run a vector search for 'Comfortable commuter bike'
FT.SEARCH pg: bikeVssIndex 
    "*=>[KNN 3 @description_embeddings $my_blob AS score ]" 
    RETURN 4 score brand type description 
    PARAMS 2 my_blob 
    -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- --------------------------------------------------
    SORTBY score
    DIALECT 2`,
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "VECTORS",
    queryId: "VECTORS_KNN_QUERY3",
  },
  {
    hId: "5",
    customQuery:
      "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    query: "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_MULTI_FIELD_OR_CONDITION",
  },
  {
    hId: "6",
    customQuery:
      "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    query: "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_MULTI_FIELD_OR_CONDITION",
  },
  {
    hId: "7",
    customQuery:
      "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    query: "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_MULTI_FIELD_OR_CONDITION",
  },
  {
    hId: "8",
    customQuery:
      "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    query: "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_MULTI_FIELD_OR_CONDITION",
  },
  {
    hId: "9",
    customQuery:
      "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    query: "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_MULTI_FIELD_OR_CONDITION",
  },
  {
    hId: "10",
    customQuery:
      "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    query: "FT.SEARCH 'pg:userSearchIndex' '@country:{AUSTRALIA} @gender:{M}'",
    createdOn: "2025-01-09T10:30:14.477Z",
    title: "User Search Query 2",
    categoryId: "JSON_GENERAL",
    queryId: "JSON_GENERAL_MULTI_FIELD_OR_CONDITION",
  },
];

const getAllQueryHistory = async () => {
  let retObj: any = {
    data: null,
    error: null,
  };

  try {
    retObj.data = queryHistoryData;
  } catch (error) {
    retObj.error = error;
  }
  return retObj;
};

const getQueryHistoryById = async (hId: string) => {
  let retObj: any = {
    data: null,
    error: null,
  };

  try {
    retObj.data = queryHistoryData.find((item) => item.hId === hId);
  } catch (error) {
    retObj.error = error;
  }
  return retObj;
};

export { getAllQueryHistory, getQueryHistoryById };
