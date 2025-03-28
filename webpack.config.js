const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

const SOURCE_FOLDER = 'src'
const BUILD_FOLDER = 'build'

const webpackConfig = {
  entry: path.join(__dirname, SOURCE_FOLDER, 'index.tsx'),
  output: {
    path: path.join(__dirname, BUILD_FOLDER),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          context: __dirname,
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          },
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: path.join(__dirname, BUILD_FOLDER, 'index.html'),
      hash: true,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    })
  ],
  devServer: {
    port: 3000,
    open: false,
    hot: false,
  },
  devtool: false,
  mode: 'development'
}

module.exports = webpackConfig
