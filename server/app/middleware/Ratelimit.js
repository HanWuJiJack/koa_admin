const RateLimit = require("./../../config/RateLimit");

module.exports = RateLimit.middleware({
    interval: 1 * 60 * 1000, // 1 minutes
    max: 100, // 限制每个ip 1分钟请求100次
    keyGenerator: async function (ctx) {
        return `${ctx.request.ip}-global`;
    },
    message: "服务器正忙，请稍后再试！"
});
// https://www.npmjs.com/package/koa2-ratelimit#use-with-mongoosestore