/*
* This code is written in old school way to make alias resolution in PhpStorm possible.
* Setup this file as your webpack config Preferences -> Languages & Frameworks -> JavaScript -> Webpack
* and enjoy your ~/logic/... hints!
* */
let webpack = require('webpack');
let path = require('path');

let aliases = {
  '~/app': path.resolve(__dirname, './frontend/app'),
  '~/common': path.resolve(__dirname, './frontend/common'),
  '~/helpers': path.resolve(__dirname, './frontend/common/helpers'),
  '~/requests': path.resolve(__dirname, './frontend/common/requests'),
  '~/store': path.resolve(__dirname, './frontend/store')
};

module.exports = {
  aliases,
  resolve: {
    alias: aliases
  }
};
