const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, '../../dist/apps/admin'),
  html: path.resolve(__dirname, 'src', 'index.html'),
  favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
  faviconDev: path.resolve(__dirname, 'src', 'favicon-dev.ico'),
};

module.exports = (env) => ({
  entry: paths.src,
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
      IS_CLOUD: Boolean(process.env.IS_CLOUD),
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': process.env.BASE_URL,
      'process.env.IS_CLOUD': process.env.IS_CLOUD,
    }),
  ].filter(Boolean),
});
