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

    app.use('/api3/auth/login', (req, res) => {
        const headers = req.headers
        let url = req.baseUrl;
        url = url.slice(5)

        const params = req.body;
        const method = req.method.toLowerCase();
        url = proxyConfig.protocol + proxyConfig.hostName + (proxyConfig.port === 80 ? '' : ':' + proxyConfig.port) + url;
        axios.defaults.headers['Content-Type'] = headers['content-type']

        if (method === 'get') {
            axios.get(url)
                .then(function (response) {
                    res.json(response.data);
                })
                .catch(function (err) {
                    res.json({
                        "data": err.response.data
                    });
                });
        } else if (method === 'post') {
            axios({
                method: 'post',
                url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    uname: 'zhuyl',
                    pwd: 'uf0000'
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],

            }).then(response => {
                res.json(response.data);
            })
            // axios.post(url, params)
            //     .then(function (response) {
            //         console.log('post');
            //         console.log(response.data);
            //         res.json(response.data);
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //         res.json({
            //             "data": err.response.data
            //         });
            //     });
        } else {
            res.end('unkown http method');
        }
        // 拼接请求路径
    })
}

module.exports = initApiRoutes;