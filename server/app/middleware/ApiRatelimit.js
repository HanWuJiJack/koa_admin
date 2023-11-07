const RateLimit = require('koa2-ratelimit').RateLimit;
const Stores = require('koa2-ratelimit').Stores;

RateLimit.defaultOptions({
    message: '操作过快，请稍后再试！',
    store: new Stores.Redis({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        },
        // password: 'redis_password',
        database: 1
    })
});

module.exports = RateLimit.middleware({
    interval: 1 * 1000, // 1s内
    max: 1,
    keyGenerator: async function (ctx) {
        return `${ctx.url}|${ctx.request.ip}`;
    }
});