module.exports = {
    group({ routers = [], app, middleware = [], prefix = undefined }) {
        for (const key in routers) {
            if (Object.hasOwnProperty.call(routers, key)) {
                let {
                    api,
                    fn,
                    name = undefined,
                    method,
                } = routers[key];

                // 路径前缀
                if (prefix) {
                    api = prefix + api
                }
                
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
