const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, '../../dist/apps/client'),
  html: path.resolve(__dirname, 'src', 'index.html'),
  favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
  faviconDev: path.resolve(__dirname, 'src', 'favicon-dev.ico'),
};

module.exports = (env) => ({
  entry: paths.src,
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  output: {
    publicPath: '/',
    path: paths.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              ref: true,
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: paths.html,
      favicon: env === 'dev' ? paths.faviconDev : paths.favicon,
      ENV: process.env.ENV,
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(isDevelopment ? 'https://app.muil.io' : ''),
      'process.env.ENV': JSON.stringify(process.env.ENV),
    }),
  ].filter(Boolean),
});
