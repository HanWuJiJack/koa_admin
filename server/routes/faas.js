const { faas } = require('../app/faas/Faas');
const Route = require('./BaseRoute')

/**
 * 后端api接口组
 */
module.exports = app => {
    Route.group({
        routers: [
            {
                api: '/faas/list/:code',
                fn: (ctx, next) => faas(ctx, next, "list"),
                method: 'get',
            },
            {
                api: '/faas/:code',
                fn: (ctx, next) => faas(ctx, next, "post"),
                method: 'post',
            },
            {
                api: '/faas/:code',
                fn: (ctx, next) => faas(ctx, next, "put"),
                method: 'put',
            },
            {
                api: '/faas/:code',
                fn: (ctx, next) => faas(ctx, next, "remove"),
                method: 'delete',
            },
            {
                api: '/faas/get/:code',
                fn: (ctx, next) => faas(ctx, next, "get"),
                method: 'get',
            },
        ],
        prefix: '/custom',
        app
    })
    return app;
}

