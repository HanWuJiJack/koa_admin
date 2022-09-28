const Auth = require(process.cwd() + '/app/middleware/auth');
// process.cwd() 方法返回 Node.js 进程的当前工作目录。

const DictType = require('../app/controller/admin/dictType');
const User = require('../app/controller/wx/user');
const Route = require('./base_route')
const path = require('path');

/**
 * 后端api接口组
 */
module.exports = app => {
    Route.group({
        routers: [
            {
                api: '/users/login',
                fn: (ctx) => new User(ctx).login(),
                method: 'post',
            },
            {
                api: '/users/code/login',
                fn: (ctx) => new User(ctx).codeLogin(),
                method: 'post',
            },
        ],
        prefix: '/wx',
        app
    })

    Route.group({
        routers: [
            //--------------------------用户--------------------------
            {
                api: '/users/edit',
                fn: (ctx) => new User(ctx).create(),
                method: 'put',
            },
            //--------------------------字典类型--------------------------
            // 全部
            {
                api: '/dictType/list',
                fn: (ctx) => new DictType(ctx).list(),
                method: 'get',
            },
            {
                api: '/dictType/add',
                fn: (ctx) => new DictType(ctx).create(),
                method: 'post',
            },
            {
                api: '/dictType/edit/:id',
                fn: (ctx) => new DictType(ctx).update(),
                method: 'put',
            },
            {
                api: '/dictType/remove/:ids',
                fn: (ctx) => new DictType(ctx).remove(),
                method: 'delete',
            },
            {
                api: '/dictType/dict/:type',
                fn: (ctx) => new DictType(ctx).getType(),
                method: 'get',
            },
            {
                api: '/dictType/:id',
                fn: (ctx) => new DictType(ctx).get(),
                method: 'get',
            },
        ],
        middleware: [Auth],
        prefix: '/wx',
        app
    })
    return app;
}

