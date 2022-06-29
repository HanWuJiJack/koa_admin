const BodyParser = require('koa-bodyparser')
const Exception = require('../exception');
const Parameter = require('koa-parameter');

module.exports = app => {
    app.use(BodyParser({
        enableTypes: ['json', 'form', 'text', 'xml']
    }));   // 处理 POST 请求数据, 将数据挂载到 ctx.request.body 上
    app.use(Exception);      // 全局统一异常的原理是在最外层包一层 try catch 所以 Exception 必须放在最顶层
    app.use(Parameter(app)); // 加入验证器 https://www.npmjs.com/package/koa-parameter
    return app;
};
