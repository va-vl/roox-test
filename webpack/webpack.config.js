const { merge } = require('webpack-merge');
//
const commonConfig = require('./webpack.common');

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';
  const modeConfig = require(`./webpack.${isProd ? 'prod' : 'dev'}`);
  return merge(commonConfig, modeConfig);
};
