const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//
const loaders = require('./loaders');

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  target: 'web',
  devServer: {
    hot: true,
    open: true,
    port: 8000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          loaders.styleLoader,
          loaders.cssLoader,
          loaders.postCssLoader,
          loaders.resolveUrlLoader,
          loaders.sassLoader,
        ],
      },
      {
        test: /\.css$/,
        use: [
          loaders.styleLoader,
          loaders.cssLoaderVendor,
          loaders.postCssLoader,
        ],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
