/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */

module.exports = {
  dev: {
    host: '127.0.0.1',
    port: 4000,
    devtool: '#cheap-module-eval-source-map',
    useEslint: false,
    proxy: {
      protocol: 'http://',
      hostName: '172.32.23.33',
      port: 17801,
    }
  },
  build: {
    productionSourceMap: true
  }
}
