const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'script.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', include: path.resolve(__dirname, "src") },
      { test: /\.jsx$/, use: 'babel-loader', include: path.resolve(__dirname, "src") },
      { test: /\.css$/, use: ['style-loader', 'css-loader'], include: path.resolve(__dirname, "src") },
      { test: /\.json$/, use: 'json-loader', include: path.resolve(__dirname, "src") },
      { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, use: 'url-loader', include: path.resolve(__dirname, "src") }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  devtool: 'cheap-module-source-map'
}