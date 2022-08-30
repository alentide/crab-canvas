const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs')

const pages = fs.readdirSync('src/pages')
const entry = Object.fromEntries(pages.map(page=>[`${page}`,`./src/pages/${page}/index.ts`]))
const htmlPlugins = pages.map(page=>new HtmlWebpackPlugin({
  filename: `${page}/index.html`,
  template: "./src/index.html",
  chunks: [`${page}`],
}))
module.exports = {
  entry,
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]/[name].js", // filename不能写死，只能通过[name]获取bundle的名字
    clean: true,
  },
  resolve: {
    extensions: ['.ts','.js', '.json', '.wasm'],
    aliasFields: ['browser'],
    alias: {
      '@': path.resolve(__dirname, "src"),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    ...htmlPlugins,
  ],
  devServer: {
    static: "./dist",
  },
  // optimization: {
  //   runtimeChunk: 'single',
  // },
};
