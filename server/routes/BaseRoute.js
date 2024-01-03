const path = require("path")
const _ = require("lodash")
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
            let newMiddleware = _.cloneDeep(middleware)
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
                newMiddleware = newMiddleware.concat(middlewareList)
                if (routers[key].api.indexOf("blog") > -1) {
                    logger.info("接口列表:", routers[key], newMiddleware)
                }
                // logger.info("接口列表:", routers[key])
                // 路由是否需要name
                if (name) {
                    app[method](name, api, ...newMiddleware, fn);
                } else {
                    app[method](api, ...newMiddleware, fn);
                }
            }
        }
    }
};