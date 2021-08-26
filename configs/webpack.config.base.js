const path = require('path');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBar = require('webpackbar');
const { appAlias } = require('./paths');
const getClientEnvironment = require('./env');

module.exports = {
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'worker-loader',
        },
      },
      {
        test: /\.less$/,
        use: [
          // ...(process.env.NODE_ENV === 'development' ? ['style-loader'] : [MiniCssExtractPlugin.loader]),
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {},
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
                modifyVars: {
                  'layout-header-height': '50px',
                  'border-radius-base': '2px'
                },
                javascriptEnabled: true
              }
            }
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // ...(process.env.NODE_ENV === 'development' ? ['style-loader'] : [MiniCssExtractPlugin.loader]),
          'vue-style-loader',
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // ...(process.env.NODE_ENV === 'development' ? ['style-loader'] : [MiniCssExtractPlugin.loader]),
          'vue-style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|tmpl)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
      },
      // {
      //   test: /\.svg/,
      //   type: 'asset/inline',
      //   generator: {
      //     dataUrl: (content) => {
      //       content = content.toString();
      //       return svgToMiniDataURI(content);
      //     },
      //   },
      // },
      {
        test: /\.svg$/,
        use: [
          'vue-svg-icon-loader',
        ],
      }
    ],
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json','.vue', '.ts', '.tsx', '.css', '.scss', '.less'],
    modules: ['node_modules'],
    // mainFields: ["browser","module", "main"],
    mainFields: ["main"],
    mainFiles: ["index"], // 解析目录时要使用的文件名
    alias: appAlias,
    fallback: { "buffer": false }
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    // 设置全局环境变量
    new webpack.DefinePlugin(getClientEnvironment()),
    new WebpackBar()
  ],
};