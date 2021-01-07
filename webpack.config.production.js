import fs from 'fs';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import chalk from 'chalk';
import webpackConf, { PUBLIC_PATH } from './webpack.config';

// Create assets public directory if not exists
if (!fs.existsSync(PUBLIC_PATH)) {
  fs.mkdirSync(PUBLIC_PATH);
}

delete webpackConf.devtool;
delete webpackConf.devServer;

let { ANALYSE } = process.env;

webpackConf.optimization.minimize = true;

// eslint-disable-next-line no-restricted-syntax
for (let key in webpackConf.entry) {
  // eslint-disable-next-line no-prototype-builtins
  if (webpackConf.entry.hasOwnProperty(key)) {
    webpackConf.entry[key] = webpackConf.entry[key].filter((entry) => !entry.includes('dev-server'));
  }
}

webpackConf.plugins = webpackConf.plugins.filter((el) => {
  if (el instanceof webpack.HotModuleReplacementPlugin) {
    return false;
  }

  return true;
});

// eslint-disable-next-line no-unused-expressions
ANALYSE ? webpackConf.plugins.push(new BundleAnalyzerPlugin()) : null; // Bundle analyzer if needed
webpackConf.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }));
webpackConf.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
webpackConf.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
webpackConf.plugins.push(new LodashModuleReplacementPlugin({
  paths: true
}));
webpackConf.plugins.push(new ProgressBarPlugin({
  width: '50',
  format: `${ chalk.green('[webpack build]') } :percent :msg \n`,
  renderThrottle: 1000
}));

export default webpackConf;
