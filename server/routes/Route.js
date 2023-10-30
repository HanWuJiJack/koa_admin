module.exports = app => {
    const router = require('koa-router')({
        // prefix: '/api' ,
    })
    router.get('/', async ctx => {
        ctx.body = {
            version: "v1"
        };
    });
    require('./Admin')(router);
    require('./Faas')(router);

    app.use(router.routes());
    // 抛出错误，而不是设置状态和标题
    app.use(router.allowedMethods({
        throw: true
    }));
    return app;
}