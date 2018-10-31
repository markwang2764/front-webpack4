/**
 * @note
 * @author  wangyuefeng
 * @create  2018-10-25
 * @des     全局配置axios
 */
import axios from 'axios';

const dev = process.env.NODE_ENV == 'development' ? true : false


// Global axios defaults
// default: 127.0.0.1:80


axios.defaults.baseURL = dev ? `http://localhost:4000/api3` : `http://skadmin.czhuyl/`
axios.defaults.headers['Content-Type'] = 'application/json'
// 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     console.log(config);

//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });


export default axios;