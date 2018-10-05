const webpack = require('webpack')
const webpackOptions = require('../build/webpack.dev')
const opn = require('opn');
const bodyParser = require('body-parser')
const path = require('path')
const compiler = webpack(webpackOptions)
const entry = require('../config/entry.js')
const chalkInfo = require('chalk').keyword('orange');
const {
  dev
} = require('../config/index')

const app = require('express')()

const devMiddlerware = require('webpack-dev-middleware')
const hotMiddlerware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const histroyApiFallback = require('connect-history-api-fallback')

const entryArr = entry[0].template.split('/');
const len = entryArr.length
const html = entryArr[len-2] + '/' + entryArr[len-1]



app.use(devMiddlerware(compiler, {
  publicPath: '',
  stats: 'errors-only',
  logLevel: 'silent', // 隐藏log日志
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
}))
app.use(hotMiddlerware(compiler, {
  log: false
}));
app.use(histroyApiFallback({
  disableDotRule: true, //处理文件后缀的404
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
// app.use(express.static('.'));

app.use('/', function (req, res) {
  res.redirect(html)
});
app.use('/api/entry', function (req, res) {
  res.json(entry)
});
let browserUrl = `http://${dev.host}:${dev.port}`
opn(browserUrl);

// app.listen(dev.port, () =>{
//     console.log(chalkInfo(`server listen on ${browserUrl}`))
// })
module.exports = app;