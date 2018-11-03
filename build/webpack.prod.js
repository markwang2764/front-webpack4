/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */

const { smart } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBuildNotifier = require('webpack-build-notifier')
const progressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const utils = require('./utils');
const entry = require('../config/entry');
const config = require('../config');
const time = process.env.npm_config_replace
  ? process.env.npm_config_replace
  : (function () {
    var date = new Date();
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    function addZero(num) {
      return num > 9 ? num : '0' + num;
    }
    return [Y, addZero(M), addZero(D), addZero(h), addZero(m)].join('');
  })();


module.exports = smart(baseConfig, {

  mode: 'production',

  devtool: 'hidden-source-map',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `[name].[${time}].js`,
    chunkFilename: 'chunks/[name].[chunkhash].min.js',
    publicPath: '',
  },

  optimization: {
    /*
    runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
    这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    */
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        vendorf: {
          chunks: "all",
          test: /node_modules/, // 路径在 node_modules 目录下的都作为公共部分
          name: "vendors", // 使用 react 入口作为公共部分
          enforce: true,
          priority: 2
        },
        commons: {
          chunks: "all",
          name: "commons", // 使用 commons 入口作为公共部分
          minChunks: 5, // 引用次数大于5则打包进commons
          minSize: 3000, // chunk大小大于这个值才允许打包进commons
          enforce: true,
          priority: 1
        },
      },
    },
  },

  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },


  plugins: [
    new progressBarWebpackPlugin(),
    new webpackBuildNotifier(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: `[name]-${time}.css`,
      allChunks: true
    }),
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
    }),
    /*
    使用文件路径的 hash 作为 moduleId。
    因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
    如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
    那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
    因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
    */
    new webpack.HashedModuleIdsPlugin(),
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
    // })
  ].concat(utils.computeHtmlWebpackEntry(entry))
})



