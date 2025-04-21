const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false, //process.env.ANALYZE === 'true',
});

const isProd = process.env.VERCEL_ENV === "production"; // or NODE_ENV === 'production'

module.exports = withBundleAnalyzer({
  swcMinify: true,
  reactStrictMode: true,
  output: "standalone",
  basePath: isProd ? "/try/sandbox" : "",
  assetPrefix: isProd ? "/try/sandbox/" : "",
});
