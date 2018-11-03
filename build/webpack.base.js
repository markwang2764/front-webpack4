/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */

const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');
const speedMeasurePlguin = require('speed-measure-webpack-plugin')
const entry = require("../config/entry");
const utils = require("./utils")

module.exports = {

  entry: utils.computeEntry(entry),

  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@com': path.resolve(__dirname, '../src/projects/sec-kill-admin-front/components')
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.css', '.less'],
    modules: [
      path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
      'node_modules', // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
    ]
  },

  module: {
    rules: [

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              /*
              html-loader 接受 attrs 参数，表示什么标签的什么属性需要调用 webpack 的 loader 进行打包。
              比如 <img> 标签的 src 属性，webpack 会把 <img> 引用的图片打包，然后 src 的属性值替换为打包后的路径。
              使用什么 loader 代码，同样是在 module.rules 定义中使用匹配的规则。
  
              如果 html-loader 不指定 attrs 参数，默认值是 img:src, 意味着会默认打包 <img> 标签的图片。
              这里我们加上 <link> 标签的 href 属性，用来打包入口 index.html 引入的 favicon.png 文件。
              */
              attrs: ['img:src', 'link:href']
            }
          }]
      },

      {
        test: /\.(jsx|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "plugins": [
                ["import", {
                  "libraryName": "antd",
                  "libraryDirectory": "es",
                  "style": "css" // `style: true` 会加载 less 文件
                }]
              ]
            }
          }
        ],
        include: [
          path.resolve(__dirname, '../src')
        ],
      },

      {
        test: /\.(tsx)$/,
        use: {
          loader: "ts-loader"
        },
        exclude: /node_modules/,
      },

      {
        /*
        匹配 favicon.png
        上面的 html-loader 会把入口 index.html 引用的 favicon.png 图标文件解析出来进行打包
        打包规则就按照这里指定的 loader 执行
        */
        test: /favicon\.png$/,
        use: [{
          // 使用 file-loader
          loader: 'file-loader',
          options: {
            /*
            name：指定文件输出名
            [hash] 为源文件的hash值，[ext] 为后缀。
            */
            publicPath: '/assets/',
            outputPath: '/images/',
            name: '[name].[ext]'
          }
        }]
      },

      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        // 排除 favicon.png, 因为它已经由上面的 loader 处理了。如果不排除掉，它会被这个 loader 再处理一遍
        exclude: /favicon\.png$/,

        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: '[name].[ext]',
            publicPath: '/assets/',
            outputPath: '/images/'
          }
        }
      },
      // {
      //   test: /\.(htm|html)$/,
      //   use: 'html-withimg-loader?min=false'
      // }

    ]
  },

  plugins: [
    new speedMeasurePlguin(),
    new ManifestPlugin()
  ]
}
