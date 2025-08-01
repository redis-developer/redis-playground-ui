const PAGE_THEMES = [
  "theme-redis",
  "theme-blue",
  "theme-blue-gray",
  "theme-teal",
  "theme-orange",
  "theme-brown",
  "theme-gray",
];

enum QueryResultFormat {
  json = "json",
  hash = "hash",
  string = "string",
  error = "error",
  aggregate = "aggregate",
  vectorSets = "vectorSets",
}

export { PAGE_THEMES, QueryResultFormat };
