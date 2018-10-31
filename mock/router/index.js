const path = require('path');
const fs = require('fs');
const url = require('url');
const router = require('express').Router();
const httpProxyMiddleware = require('http-proxy-middleware');
const upload = require('../server/upload');

const config = require('../../config');

const Router = function (app) {
    router.get('/', function (req, res) {
        // 根路由
        res.render('index.html');
    });
    router.get(/html/, function (req, res) {
        // html路由
        res.render(req.path.replace('/', ''));
    });




    // ！！！！！！！
    //不要删掉这个代码 谢谢
    // ！！！！！！！！
    if (process.env.proxy == 'w') {
        const filter = function (pathname, req) {
            return !(pathname.match('html') || pathname === '/');
        };
        app.use(httpProxyMiddleware(filter, {
            // target: 'http://172.16.35.185:17814/',
            // target: 'http://172.16.35.211:17814/',
            target: 'http://youtui-manager.tuiapre.cn',
            changeOrigin: true
        }));
        app.use(router);
        return
    }




    /**
     npm命令中带有process.env.proxy参数,则开启代理到指定服务器
     **/
    if (process.env.proxy) {
        const filter = function (pathname, req) {
            return !(pathname.match('html') || pathname === '/');
        };
        app.use(httpProxyMiddleware(filter, {
            target: process.env.proxy,
            changeOrigin: true
        }));

        /**
         如果proxyUrl.js中配置代理地址，则转发
         **/
        // if (proxyUrl) {
        //    const filter = function(pathname, req) {
        //      return !(pathname.match('html') || pathname === '/');
        //    };

        //    app.use(httpProxyMiddleware(filter, {
        //      target: proxyUrl,
        //      changeOrigin: false
        //    }));
    } else {
        /**
         模拟SSO跳转
         **/
        router.get('/auth/ssoIndex', function (req, res) {
            res.cookie('sso_tickt', '6fb1f563995a2b60720567f4940b8844');
            const params = url.parse(req.url, true).query;
            res.redirect(params.redirect);
        });
        router.post(/\/upload\/index/, (req, res) => {
            upload(req, res);
        });
        router.all('*', (req, res) => {
            // mock路由，优先查找JS，其次是JSON，找不到返回默认值
            const JSFilePath = path.join(__dirname, '../server/', `${req.path}.js`);
            const JSONFilePath = path.join(__dirname, '../server/', `${req.path}.json`);
            if (fs.existsSync(JSFilePath)) {
                const file = fs.readFileSync(JSFilePath);
                res.json(JSON.parse(file));
            } else if (fs.existsSync(JSONFilePath)) {
                const file = fs.readFileSync(JSONFilePath);
                res.json(JSON.parse(file));
            } else {
                res.json({
                    code: '0',
                    desc: '成功',
                    data: '0'
                });
            }
        });
    }
    app.use(router);
};

module.exports = Router;
