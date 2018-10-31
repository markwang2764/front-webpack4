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
const histroyApiFallback = require('connect-history-api-fallback')

const entryArr = entry[0].template.split('/')
const len = entryArr.length
const html = entryArr[len - 2] + '/' + entryArr[len - 1]
const rootPath = entryArr[len - 2]
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


Object.defineProperty(app, '_$_proxyCache', {
  value: {}
})
Object.defineProperty(app, 'getProxy', {
  value: function (url, proxy, cb) {
    console.log(url)
    console.log(proxy)
    app._$_proxyCache[url] = proxy;
    console.log(app._$_proxyCache);
    app.get(url, (req, res) => {
      var url = req.url;
      if (url.indexOf('?')) {
        var url = url.split('?')[0];
      }
      var prox = app._$_proxyCache[url];
      cb(req, res, prox);
    });
  }
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

httpProxy(app);



let browserUrl = `http://localhost:${dev.port}`

opn(`${browserUrl}/${html}`);

app.listen(dev.port)
// module.exports = app;
