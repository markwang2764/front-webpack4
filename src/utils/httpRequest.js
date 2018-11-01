/**
 * @note
 * @author  wangyuefeng
 * @create  2018-10-25
 * @des     全局配置axios
 */
import axios from 'axios';
const qs = require('query-string');
const dev = process.env.NODE_ENV == 'development' ? true : false

const ResCode = {
    '1001': 'session过期',
    '1002': '请求失败',
    '1003': '参数错误',
    '1004': '用户已经存在',
    '1005': '用户名或者密码错误',
    '1006': '用户不存在',
    '1007': '参数不合法'
}
// Global axios defaults
// default: 127.0.0.1:80


axios.defaults.baseURL = false ? `http://localhost:4000/api3` : `http://115.159.25.77:3000`
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
const headerToken = 'Bearer ' + sessionStorage.token || '';
axios.defaults.headers.common['Authorization'] = headerToken

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.data = qs.stringify(config.data)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    if (res.status < 200 || res.status > 300) {
        return Promise.reject(res.data || {})
    } else {

        for (let v of Object.keys(ResCode)) {
            if (res.data.code == v) {
                return Promise.reject(ResCode[v])
            }
        }
    }
    if (res.data.token) {
        sessionStorage.token = res.data.token
    }
    return res.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default axios;