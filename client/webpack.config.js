const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const path = require("path")

const currentTask = process.env.npm_lifecycle_event

const config = {
  entry: "/app/Main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundled.js"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./app/index.html" }),
    new CopyPlugin({
      patterns: [{ from: "./app/img", to: "./img" }]
    })
  ],
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "app")
    },
    hot: true,
    liveReload: false,
    historyApiFallback: { index: "index.html" }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}

if (currentTask == "build" || currentTask == "deploy") {
  config.mode = "production"
  config.module.rules[1].use[0] = MiniCssExtractPlugin.loader
  config.plugins.push(new MiniCssExtractPlugin({ filename: "main.css" }), new CleanWebpackPlugin())
}

module.exports = config
