#1. 多入口 react antd 后台管理 

#2. 基于webpack4 构建 使用webpack-dev-middle 加入 express 自启服务 及 api 转发 

#3. 支持typeScript 支持所有其他前端库 例如 vue zepto 等

#4. 使用 在projects 下新建项目 => npm run dev 项目名称  npm run build 项目名称 

#5. 支持一次性构建多项目 npm run dev（nodejs 递归文件夹 生成webpack 入口）

#6. 构建项目 根据时间戳 支持持续集成 以后会加入静态资源自动上传腾讯云 目前还是上传oss的逻辑

#7. 后期根据实际业务需求加入jest mocha 支持单元测试、 及eslint 代码规范、jenkins持续集成

#9. 后期优化webpack4 根据实际业务分common-trunk实现缓存优化 优化tree-sharking机制 构建流程中自定义plugin
