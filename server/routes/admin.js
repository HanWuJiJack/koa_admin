const Auth = require("./../app/middleware/Auth");
const Admin = require("./../app/controller/admin/Admin")
const WX = require("./../app/controller/wx/WX")
const Route = require('./BaseRoute')
// async list(){}
// async list_all(){}
// async get(){}
// async create(){}
// async update(){}
// async remove(){}
const getMethod = (key) => {
    if (key.indexOf('list') > -1) {
        return 'get'
    }
    if (key.indexOf('get') > -1) {
        return 'get'
    }
    if (key.indexOf('create') > -1) {
        return 'post'
    }
    if (key.indexOf('update') > -1) {
        return 'put'
    }
    if (key.indexOf('remove') > -1) {
        return 'delete'
    }
    if (key.indexOf('del') > -1) {
        return 'delete'
    }
}

const getRoutes = (arr) => {
    return arr.flatMap((controllerItem) => {
        const controller = new controllerItem({});
        const list = []
        const keys = Object.getOwnPropertyNames(controllerItem.prototype)
        for (const i in keys) {
            const Fn = controller[keys[i]];
            if (Object.prototype.toString.call(Fn) === "[object Function]" || Object.prototype.toString.call(Fn) === "[object AsyncFunction]") {
                let api = controller.url + '/' + keys[i]
                if (keys[i].indexOf('get') > -1) {
                    api+=`/:id`
                }
                if (keys[i].indexOf('update') > -1) {
                    api+=`/:id`
                }
                if (keys[i].indexOf('remove') > -1) {
                    api+=`/:ids`
                }
                const fn = (ctx, next) => {
                    return new controllerItem({ ctx, next })[keys[i]]()
                }
                const method = getMethod(keys[i])
                if (method) {
                    list.push({
                        api,
                        fn,
                        method,
                    })
                }
            }
        }
        return list
    });
}

// 权限列表
const AuthList = getRoutes([...Admin.auth, ...WX.auth])
// 开放列表
const openList = getRoutes([...Admin.public, ...WX.public]);

/**
 * 后端api接口组
 */
module.exports = app => {
    Route.group({
        routers: openList,
        prefix: '/open',
        app
    })
    Route.group({
        routers: AuthList,
        middleware: [Auth],
        prefix: '/auth',
        app
    })
    return app;
}

