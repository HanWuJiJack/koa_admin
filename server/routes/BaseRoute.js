const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
module.exports = {
    group({
        routers = [],
        app,
        middleware = [],
        prefix = undefined
    }) {
        for (const key in routers) {
            if (Object.hasOwnProperty.call(routers, key)) {
                if (prefix) {
                    routers[key].api = prefix + routers[key].api
                }
                let {
                    api,
                    fn,
                    name = undefined,
                    method,
                    middlewareList = [],
                } = routers[key];
                // 路径前缀
                middleware = middleware.concat(middlewareList)
                if (routers[key].api.indexOf("user") > -1) {
                    logger.info("接口列表:", routers[key])
                    // console.log(middlewareList)
                    // console.log(middleware)
                }
                // logger.info("接口列表:", routers[key])
                // 路由是否需要name
                if (name) {
                    app[method](name, api, ...middleware, fn);
                } else {
                    app[method](api, ...middleware, fn);
                }
            }
        }
    }
};