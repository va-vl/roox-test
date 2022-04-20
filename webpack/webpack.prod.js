const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//
const loaders = require('./loaders');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  target: 'browserslist',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          loaders.miniCssExtractPluginLoader,
          loaders.cssLoader,
          loaders.postCssLoader,
          loaders.resolveUrlLoader,
          loaders.sassLoader,
        ],
      },
      {
        test: /\.css$/,
        use: [
          loaders.miniCssExtractPluginLoader,
          loaders.cssLoaderVendor,
          loaders.postCssLoader,
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],
  optimization: {
    emitOnErrors: true,
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
};
