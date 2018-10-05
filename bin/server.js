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
// const proxyMiddleware = require('http-proxy-middleware')
const histroyApiFallback = require('connect-history-api-fallback')

const entryArr = entry[0].template.split('/')
const len = entryArr.length
const html = entryArr[len - 2] + '/' + entryArr[len - 1]

app.use(histroyApiFallback({
  index: '/' + html,
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

app.use(express.static('assets/'))

let browserUrl = `http://localhost:${dev.port}`
opn(`${browserUrl}/${html}`);

app.listen(dev.port)
// module.exports = app;
