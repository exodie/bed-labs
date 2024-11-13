const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/info.html",
      inject: true,
      chunks: ["index"],
      filename: "info.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/projects.html",
      inject: true,
      chunks: ["index"],
      filename: "projects.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/todo.html",
      inject: true,
      chunks: ["index"],
      filename: "todo.html",
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },

    open: true,
  },

  mode: "development",
};
