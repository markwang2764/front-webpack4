/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */
const webpack = require('webpack')
const webpackOptions = require('../build/webpack.dev')
const opn = require('opn')
const bodyParser = require('body-parser')
const path = require('path')
const compiler = webpack(webpackOptions)
const entry = require('../config/entry.js')
const ejs = require('ejs')
const chalkInfo = require('chalk').keyword('orange')
const {
  dev
} = require('../config/index')
const express = require('express')
const app = express()

const devMiddlerware = require('webpack-dev-middleware')
const hotMiddlerware = require('webpack-hot-middleware')
const httpProxy = require('../mock/proxy');
const proxy = require('http-proxy-middleware');//引入代理中间件
const histroyApiFallback = require('connect-history-api-fallback')

const html = '/' + entry[0].template


app.use(histroyApiFallback({
  index: html,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));


app.use(devMiddlerware(compiler, {
  publicPath: webpackOptions.output.publicPath,
  stats: 'errors-only',
  logLevel: 'silent', // 隐藏log日志
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
}))

app.use(hotMiddlerware(compiler, {
  log: false
}));

// app.use(express.static('assets/'))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// var options = {
//   target: 'http://115.159.25.77:3000/', // target host
//   changeOrigin: true,                // needed for virtual hosted sites
//   pathRewrite: {
//     '^/api3/': '/'     // rewrite path
//   }
// };
// // Add middleware for http proxying
// app.use('/api3/*', proxy(options));//api子目录下的都是用代理


let browserUrl = `http://localhost:${dev.port}`

opn(`${browserUrl}`);
app.listen(dev.port)
// module.exports = app;
