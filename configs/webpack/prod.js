// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "public/index.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [],
});
