/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = {
  env: {
    SENTRY_DSN: "http://dc92150ec47041968279837bb4eb872f@192.168.1.83:9000/5",
  },
  webpack: (config, { isServer, buildId }) => {
    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.SENTRY_RELEASE": JSON.stringify(buildId),
      }),
    );

    if (isProd) {
      config.devtool = "hidden-source-map";
      config.plugins.push(
        new SentryCliPlugin({
          include: [".next"],
          ignore: ["node_modules"],
          release: buildId,
          configFile: ".sentryclirc",
          urlPrefix: "~/_next",
        }),
      );
    }

    return config;
  },
  ...nextConfig,
};
