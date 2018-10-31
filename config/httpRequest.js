/**
 * @note
 * @author  wangyuefeng
 * @create  2018-10-25
 * @des     全局配置axios
 */
const axios = require('axios');
const utils = require('../build/utils');

// Global axios defaults
// default: 127.0.0.1:80


axios.defaults.baseURL = `http://${utils.getHost()}:${utils.getPort()}`;
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


module.exports = axios;