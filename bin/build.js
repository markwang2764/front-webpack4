const webpack = require('webpack')
const execFile = require('child_process').execFile
const path = require('path')

const chalk = require('chalk');
const log = console.log
const log_green = chalk.green
const log_bgRed = chalk.bgRed
const log_warning = chalk.keyword('orange');

const webpackConfig = require('../build/webpack.prod')
webpack(webpackConfig, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))
  log(chalk.cyan(' \n--------------- Build complete.------------------\n'));
})