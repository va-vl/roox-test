const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//
const loaders = require('./loaders');

const resolvePath = (...paths) => path.resolve(__dirname, '..', ...paths);

module.exports = {
  entry: resolvePath('./src/index.tsx'),
  output: {
    path: resolvePath('./build'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[id].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: [
      '*',
      '.tsx',
      '.ts',
      '.js',
      '.jsx',
      '.scss',
      '.png',
      '.jpg',
      '.jpeg',
      '.svg',
    ],
    alias: {
      '@': resolvePath('./src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: [loaders.babelLoader],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('./public/index.html'),
      favicon: resolvePath('./public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
};
