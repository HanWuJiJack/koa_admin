const Auth = require(process.cwd() + '/app/middleware/auth');
// process.cwd() 方法返回 Node.js 进程的当前工作目录。
const Dept = require('../app/controller/admin/dept');
const Dict = require('../app/controller/admin/dict');
const DictType = require('../app/controller/admin/dictType');
const Faas = require('../app/controller/admin/faas');
const Leaves = require('../app/controller/admin/leaves');
const Menu = require('../app/controller/admin/menu');
const Roles = require('../app/controller/admin/roles');
const User = require('../app/controller/admin/user');
const FileController = require('../app/controller/admin/file');
const FileExcelController = require('../app/controller/admin/fileExcel');
const publicRas = require('../app/controller/admin/publicRas');
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
            // {
            //     api: '/user',
            //     fn: (ctx) => new User(ctx).create(),
            //     method: 'post',
            // },
            {
                api: '/file',
                fn: (ctx, next) => new FileController(ctx, next).upload(),
                method: 'post',
            },
            {
                api: '/goods/file',
                fn: (ctx, next) => new FileController(ctx, next).goodsUpload(),
                method: 'post',
            },
            {
                api: '/goods/zip',
                fn: (ctx, next) => new FileController(ctx, next).getZip(),
                method: 'post',
            },
            {
                api: '/goods/file',
                fn: (ctx, next) => new FileController(ctx, next).goodsRemoveUpload(),
                method: 'delete',
            },
            {
                api: '/excel/file',
                fn: (ctx, next) => new FileExcelController(ctx, next).upload(),
                method: 'post',
            },
            {
                api: '/publicras',
                fn: (ctx, next) => new publicRas(ctx, next).get(),
                method: 'get',
            },
            {
                api: '/dictType/dict/open/:type',
                fn: (ctx) => new DictType(ctx).getOpenType(),
                method: 'get',
            },
            {
                api: '/user/open',
                fn: (ctx) => new User(ctx).getUserOpen(),
                method: 'get',
            },
            
        ],
        prefix: '/api',
        app
    })

    Route.group({
        routers: [
            {
                api: '/users/list',
                fn: (ctx) => new User(ctx).list(),
                method: 'get',
            },

            {
                api: '/users/all/list',
                fn: (ctx) => new User(ctx).all(),
                method: 'get',
            },
            {
                api: '/users/delete',
                fn: (ctx) => new User(ctx).remove(),
                method: 'post',
            },
            {
                api: '/users/delete',
                fn: (ctx) => new User(ctx).remove_(),
                method: 'delete',
            },
            {
                api: '/users/operate',
                fn: (ctx) => new User(ctx).create(),
                method: 'post',
            },
            {
                api: '/users/getUserInfo',
                fn: (ctx) => new User(ctx).getUserInfo(),
                method: 'get',
            },
            {
                api: '/users/changePWS',
                fn: (ctx) => new User(ctx).changePWS(),
                method: 'put',
            },
            // ---------------------角色------------------------------
            {
                api: '/roles/all/list',
                fn: (ctx) => new Roles(ctx).all(),
                method: 'get',
            },
            {
                api: '/roles/list',
                fn: (ctx) => new Roles(ctx).list(),
                method: 'get',
            },
            {
                api: '/roles/operate',
                fn: (ctx) => new Roles(ctx).create(),
                method: 'post',
            },
            {
                api: '/roles/operate',
                fn: (ctx) => new Roles(ctx).all(),
                method: 'get',
            },
            {
                api: '/roles/update/permission',
                fn: (ctx) => new Roles(ctx).permission(),
                method: 'post',
            },
            // ---------------------菜单------------------------------

            {
                api: '/menu/list',
                fn: (ctx) => new Menu(ctx).list(),
                method: 'post',
            },
            {
                api: '/menu/getPermissonMenuList',
                fn: (ctx) => new Menu(ctx).getPermissonMenuList(),
                method: 'get',
            },
            {
                api: '/menu/operate',
                fn: (ctx) => new Menu(ctx).create(),
                method: 'post',
            },
            // --------------审批-------------
            {
                api: '/leave/list',
                fn: (ctx) => new Leaves(ctx).list(),
                method: 'get',
            },

            {
                api: '/leave/operate',
                fn: (ctx) => new Leaves(ctx).create(),
                method: 'post',
            },
            {
                api: '/leave/approve',
                fn: (ctx) => new Leaves(ctx).approve(),
                method: 'post',
            },
            {
                api: '/leave/count',
                fn: (ctx) => new Leaves(ctx).count(),
                method: 'get',
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
            //--------------------------字典--------------------------
            {
                api: '/dict/list',
                fn: (ctx) => new Dict(ctx).list(),
                method: 'get',
            },
            {
                api: '/dict/add',
                fn: (ctx) => new Dict(ctx).create(),
                method: 'post',
            },
            {
                api: '/dict/edit/:id',
                fn: (ctx) => new Dict(ctx).update(),
                method: 'put',
            },
            {
                api: '/dict/remove/:ids',
                fn: (ctx) => new Dict(ctx).remove(),
                method: 'delete',
            },
            {
                api: '/dict/:id',
                fn: (ctx) => new Dict(ctx).get(),
                method: 'get',
            },
            //--------------------------faas--------------------------
            {
                api: '/faas/list',
                fn: (ctx) => new Faas(ctx).list(),
                method: 'get',
            },
            {
                api: '/faas/add',
                fn: (ctx) => new Faas(ctx).create(),
                method: 'post',
            },
            {
                api: '/faas/edit/:id',
                fn: (ctx) => new Faas(ctx).update(),
                method: 'put',
            },
            {
                api: '/faas/remove/:ids',
                fn: (ctx) => new Faas(ctx).remove(),
                method: 'delete',
            },
            {
                api: '/faas/:id',
                fn: (ctx) => new Faas(ctx).get(),
                method: 'get',
            },
            //--------------------------部门--------------------------
            // 个人
            {
                api: '/dept/list',
                fn: (ctx) => new Dept(ctx).list(),
                method: 'get',
            },
            {
                api: '/dept/operate',
                fn: (ctx) => new Dept(ctx).create(),
                method: 'post',
            },
        ],
        middleware: [Auth],
        prefix: '/api',
        app
    })
    return app;
}

