const {
  smart
} = require('webpack-merge')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const baseConfig = require('./webpack.base')
const path = require('path')
const entry = require("../config/entry");

console.log(entry);

const utils = require("./uitls")
utils.computeEntry(entry)
console.log(baseConfig);

Object.keys(baseConfig.entry).forEach(function (name) {

  if (name !== 'vendors') {
    baseConfig.entry[name] = baseConfig.entry[name].concat('webpack-hot-middleware/client?reload=true');
  }

});


module.exports = smart(baseConfig, {

  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: 'chunks/[name].[chunkhash].min.js'
  },

  devtool: 'cheap-module-eval-source-map',

  performance: {
    hints: false
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${port}`],
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
  ]
})





const computeHtmlWebpackEntry = function (entry) {
  entry = entry || [];
  let result = [];

  for (let i = 0, len = entry.length; i < len; i++) {
    let item = entry[i];
    let path = item.path;
    let name = item.name;
    // let pathBuild = path.replace(/\//g, '-')
    let pathBuild = path;
    let template = item.template;

    result.push(
      new HtmlWebpackPlugin({
        template: template,
        filename: path + name + '.html',
        inject: true, // 默认值，script标签位于html文件的 body 底部
        chunks: [pathBuild + name], // 不指定的话就会加载所有的chunk
        // chunks: [pathBuild + name, 'runtime~' + pathBuild + name, 'vendors', 'app', 'default'], // 不指定的话就会加载所有的chunk
        // chunks: [pathBuild + name, 'vendors', 'default'], // 不指定的话就会加载所有的chunk
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency',
        minify: false // Pass html-minifier's options as object to minify the output
      })
    );
  }
  result.push(
    new HtmlWebpackScriptAttributesPlugin({
      crossorigin: 'anonymous'
    })
  );
  return result;
};
