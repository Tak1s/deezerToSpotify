// import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import CleanupPlugin from '@lipemat/webpack-cleanup-plugin';
import { config as dotenvSafeConfigure } from 'dotenv-safe';
import { aliases } from './aliases';
import babelLoader from './webpack/loaders/babel';
// import cssLoader from './webpack/loaders/css';
import cssModulesLoader from './webpack/loaders/cssModules';
import eslintLoader from './webpack/loaders/eslint';
import fontsLoader from './webpack/loaders/fonts';
import imageLoader from './webpack/loaders/image';
import svgLoader from './webpack/loaders/svg';
import svgInlineLoader from './webpack/loaders/svgInline';

dotenvSafeConfigure({
  allowEmptyValues: true
});

process.env.BABEL_ENV = 'build';

// Constants
export const PROJECT_NAME = 'gearfinder';
export const UI_PATH = path.resolve(__dirname, './frontend');
export const PUBLIC_PATH = path.resolve(__dirname, './public');

// Needed for long-term caching on prod build and hot loader correct work
export const HASH_STRATEGY = process.env.NODE_ENV === 'production' ? 'chunkhash' : 'hash';

// Create assets public directory if not exists
if (!fs.existsSync(PUBLIC_PATH)) {
  fs.mkdirSync(PUBLIC_PATH);
}

export default {
  devtool: 'source-map',
  context: UI_PATH,
  mode: process.env.NODE_ENV,

  entry: {
    [PROJECT_NAME]: [
      './',
      '@babel/polyfill',
      'raf/polyfill',
      'matchmedia-polyfill',
      'classlist-polyfill',
      'webstorage-fallback',
      'isomorphic-fetch',
      'moment-duration-format',
      'navigator.sendbeacon',
      'webpack-dev-server/client?http://0.0.0.0', // WebpackDevServer host and port
      'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors,
    ]
  },
  output: {
    path: PUBLIC_PATH,
    filename: `chunks/[name].[${ HASH_STRATEGY }].js`,
    chunkFilename: `chunks/[name].[id].[${ HASH_STRATEGY }].js`,
    publicPath: '/'
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '9696',
    proxy: {
      '/': 'http://localhost:3000'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      ...aliases,
      // https://github.com/gaearon/react-hot-loader/issues/417#issuecomment-261548082
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    },
    modules: ['node_modules']
  },
  module: {
    rules: [
      { // Fix for prod build tree shaking
        include: path.resolve('node_modules', 'redux-form'),
        sideEffects: true
      },
      eslintLoader,
      babelLoader,
      cssModulesLoader,
      imageLoader,
      svgLoader,
      svgInlineLoader,
      fontsLoader
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '.',
      chunks: 'all'
    }
  },
  plugins: [
    new CleanupPlugin({ quiet: true }),
    new StyleLintPlugin({ quiet: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // Env variable processing
    new webpack.DefinePlugin(Object.keys(process.env).reduce((res, key) => {
      res[`ENV.${ key }`] = JSON.stringify(process.env[key]);
      return res;
    }, { ENV: {} })),
    new MiniCssExtractPlugin({
      filename: `chunks/[name].[${ HASH_STRATEGY }].css`,
      chunkFilename: `chunks/[name].[id].[${ HASH_STRATEGY }].css`,
      ignoreOrder: true
    }),

    // Remove locales from moment.js (bundle size optimizations)
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /en/
    ),

    // Static html generation
    new HtmlWebpackPlugin({
      template: `${ UI_PATH }/index.ejs`,
      // favicon: path.resolve(__dirname, 'static', 'favicon.ico'),
      title: 'DeezerToSpotify',
      filename: 'index.html',
      env: process.env,
      chunks: [PROJECT_NAME]
    })
  ]
};
