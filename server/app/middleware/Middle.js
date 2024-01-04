const BodyParser = require('koa-bodyparser')
const GlobalException = require('./GlobalException');
const Global = require('./Global');
const Parameter = require('koa-parameter');
const Limit = require("./Ratelimit")

module.exports = app => {
    app.use(BodyParser({
        enableTypes: ['json', 'form', 'text', 'xml'],
        formLimit:"10mb",
        jsonLimit:"10mb",
    }));
    // 处理 POST 请求数据, 将数据挂载到 ctx.request.body 上
    app.use(Global);
    app.use(GlobalException);      // 全局统一异常的原理是在最外层包一层 try catch 所以 Exception 必须放在最顶层
    // app.use(Limit);
    app.use(Parameter(app)); // 加入验证器 https://www.npmjs.com/package/koa-parameter
    return app;
};
