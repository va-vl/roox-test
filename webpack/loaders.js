const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  styleLoader: {
    loader: 'style-loader',
  },
  cssLoader: {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 2,
      modules: {
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
      },
    },
  },
  cssLoaderVendor: {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  postCssLoader: {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      postcssOptions: {
        plugins: ['postcss-preset-env'],
      },
    },
  },
  sassLoader: {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
  miniCssExtractPluginLoader: MiniCssExtractPlugin.loader,
  babelLoader: {
    loader: 'babel-loader',
  },
  resolveUrlLoader: {
    loader: 'resolve-url-loader',
  },
};
