const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProd ? "/try/sandbox" : "",
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false, //process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  swcMinify: true, // Enable SWC minification
  reactStrictMode: true,
  output: "standalone", // lightweight standalone app
});
