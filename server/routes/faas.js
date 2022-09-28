const Auth = require(process.cwd() + '/app/middleware/auth');
// process.cwd() 方法返回 Node.js 进程的当前工作目录。
const { faas } = require('../app/faas/index');
const Route = require('./faas_base_route')
const path = require('path');

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
                api: '/faas/:code',
                fn: (ctx, next) => faas(ctx, next, "get"),
                method: 'get',
            },
        ],
        prefix: '/custom',
        app
    })
    return app;
}

