const RateLimit = require('koa2-ratelimit').RateLimit;
const Stores = require('koa2-ratelimit').Stores;

RateLimit.defaultOptions({
    message: '服务器正忙，请稍后再试！',
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
    interval: 1 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per interval
    keyGenerator: async function (ctx) {
        return `${ctx.request.ip}`;
    }
});
// https://www.npmjs.com/package/koa2-ratelimit#use-with-mongoosestore