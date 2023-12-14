/** @type {import('next').NextConfig} */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction

// const { withSentryConfig } = require("@sentry/nextjs");

// your existing module.exports or default export
const nextConfig = {
  // Optional build-time configuration options
  reactStrictMode: true,
  // sentry: {
  //   // For all available options, see:
  //   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  //   // Upload a larger set of source maps for prettier stack traces (increases build time)
  //   widenClientFileUpload: true,

  //   // Transpiles SDK to be compatible with IE11 (increases bundle size)
  //   transpileClientSDK: true,

  //   // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  //   tunnelRoute: "/monitoring",

  //   // Hides source maps from generated client bundles
  //   hideSourceMaps: true,

  //   // Automatically tree-shake Sentry logger statements to reduce bundle size
  //   disableLogger: true,

  //   // See the sections below for information on the following options:
  //   //   'Configure Source Maps':
  //   //     - disableServerWebpackPlugin
  //   //     - disableClientWebpackPlugin
  //   //     - hideSourceMaps
  //   //     - widenClientFileUpload
  //   //   'Configure Legacy Browser Support':
  //   //     - transpileClientSDK
  //   //   'Configure Serverside Auto-instrumentation':
  //   //     - autoInstrumentServerFunctions
  //   //     - excludeServerRoutes
  //   //   'Configure Tunneling to avoid Ad-Blockers':
  //   //     - tunnelRoute
  // },
};

// const sentryWebpackPluginOptions = {
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options

//   // Additional config options for the Sentry webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

//   org: process.env.SENTRY_ORG,

//   project: process.env.SENTRY_PROJECT,

//   // An auth token is required for uploading source maps.
//   // You can get an auth token from https://sentry.io/settings/account/api/auth-tokens/
//   // The token must have `project:releases` and `org:read` scopes for uploading source maps
//   authToken: process.env.SENTRY_AUTH_TOKEN,

//   // Suppresses source map uploading logs during build
//   silent: true, // Suppresses all logs

//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

// If you're using a next.config.mjs file:
// export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
