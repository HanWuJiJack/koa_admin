module.exports = app => {
    const router = require('koa-router')({
        // prefix: '/api' ,
    })
    require('./admin.js')(router);
    require('./wx')(router);
    require('./faas')(router);

    app.use(router.routes());
    // 抛出错误，而不是设置状态和标题
    app.use(router.allowedMethods({throw: true}));
    return app;
}


