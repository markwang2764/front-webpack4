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
      // 转发接口主机名
      protocol: 'http://',
      // 转发接口主机名
      hostName: 'skadmin.czhuyl',
      port: 80,
      // 是否使用代理接口数据 , false则使用mock数据
      // open: false
      open: true
    }
  },
  build: {
    productionSourceMap: true
  }
}
