const Auth = require("./../app/middleware/Auth");
const Admin = require("./../app/controller/admin/Admin")
const WX = require("./../app/controller/wx/WX")
const Route = require('./BaseRoute')
// "Get|list" Get "Get:id"
// Update "Update:id"
// Create
// Remove "Remove:ids"
// | 代表拼接后端字符串
// : 代表拼接后端动态路由

const methods = ["Get", "Update", "Create", "Remove"]
const getMethod = (key) => {
    if (key.indexOf('Get') > -1) {
        return 'get'
    }
    if (key.indexOf('Create') > -1) {
        return 'post'
    }
    if (key.indexOf('Update') > -1) {
        return 'put'
    }
    if (key.indexOf('Remove') > -1) {
        return 'delete'
    }
}

const getRoutes = (arr) => {
    return arr.flatMap((controllerItem) => {
        const controller = new controllerItem({});
        const list = []
        const keys = Object.getOwnPropertyNames(controllerItem.prototype)
        for (const i in keys) {
            // 过滤函数
            let sum = 0
            for (const item of methods) {
                if (keys[i].indexOf(item) > -1) {
                    sum++
                }
            }
            if (sum == 0) {
                continue;
            }
            const Fn = controller[keys[i]];
            if (Object.prototype.toString.call(Fn) === "[object Function]" || Object.prototype.toString.call(Fn) === "[object AsyncFunction]") {
                let api = controller.url
                if (keys[i].indexOf("|") > -1 && keys[i].indexOf(":") > -1) {
                    api = api + "/" + keys[i].split("|").slice(1).join("/")
                    api = api.replaceAll(":", "/:")
                } else {
                    if (keys[i].indexOf("|") > -1) {
                        api = api + "/" + keys[i].split("|").slice(1).join("/")
                    }
                    if (keys[i].indexOf(":") > -1) {
                        api = api + "/:" + keys[i].split(":").pop()
                    }
                }
                const fn = (ctx, next) => {
                    return new controllerItem({
                        ctx,
                        next
                    })[keys[i]]()
                }
                const method = getMethod(keys[i])
                if (!controller.middleLists) {
                    controller.middleLists = {}
                }
                if (!controller.middleLists[keys[i]]) {
                    controller.middleLists[keys[i]] = []
                }
                if (method) {
                    list.push({
                        api,
                        fn,
                        method,
                        middlewareList: [...controller.middleLists[keys[i]]]
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