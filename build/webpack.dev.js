/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */

const {
  smart
} = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const baseConfig = require('./webpack.base')
const entry = require('../config/entry')
const utils = require('./utils')

const {
  dev
} = require('../config')


Object.keys(baseConfig.entry).forEach(function (name) {

  if (name !== 'vendors') {
    baseConfig.entry[name] = baseConfig.entry[name].concat('webpack-hot-middleware/client?reload=true');
  }

});


module.exports = smart(baseConfig, {

  mode: 'development',

  output: {
    publicPath: '/',
  },

  devtool: 'cheap-module-eval-source-map',

  performance: {
    hints: false
  },

  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      usePostCSS: true
    })
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${dev.port}`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true
    }),
    new webpack.DefinePlugin({
      DEBUG: true,
      VERSION: '1'
    })
  ].concat(utils.computeHtmlWebpackEntry(entry))
})







