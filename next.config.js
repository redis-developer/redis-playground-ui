const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: false,//process.env.ANALYZE === 'true',
});

const basePath = '/try/sandbox'; //also set in src/app/common/css/typography.scss
module.exports = withBundleAnalyzer({
    basePath: basePath,
    swcMinify: true,  // Enable SWC minification
    reactStrictMode: true,
    output: "standalone", // lightweight standalone app 
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
});

