/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-27
 * @des 根据mock/routes自动生成所有的服务器api
 */
var fs = require('fs');
var axios = require('axios');
var proxyConfig = require('./proxy-config');



/**
 * 请求后端接口
 * @param app express 实例
 */

function initApiRoutes(app) {
    app.use('*', (req, res) => {
        var headers = req.headers
        var url = req.baseUrl;
        if (url.indexOf('api3') == -1) return
        url = url.slice(5)
        var params = req.body;
        var method = req.method.toLowerCase();
        url = proxyConfig.protocol + proxyConfig.hostName + (proxyConfig.port === 80 ? '' : ':' + proxyConfig.port) + url;
        axios.defaults.headers['Content-Type'] = headers['content-type']
        console.log(`request url = ${url}`);
        if (method === 'get') {
            axios.get(url)
                .then(function (response) {
                    res.json(response.data);
                })
                .catch(function (err) {
                    res.json({
                        "status": err.response.status,
                        "statusText": err.response.statusText,
                        "data": err.response.data
                    });
                });
        } else if (method === 'post') {
            axios.post(url, params)
                .then(function (response) {
                    res.json(response.data);
                })
                .catch(function (err) {
                    res.json({
                        "status": err.response.status,
                        "statusText": err.response.statusText,
                        "data": err.response.data
                    });
                });
        } else {
            res.end('unkown http method');
        }
        // 拼接请求路径
    })
}

module.exports = initApiRoutes;