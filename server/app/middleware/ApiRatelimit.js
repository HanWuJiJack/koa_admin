const RateLimit = require("./../../config/RateLimit");


module.exports = (time, max) => {
    return RateLimit.middleware({
        interval: time * 1000, // 1s内
        max: max,
        keyGenerator: async function (ctx) {
            // console.log(`${ctx.url}|${ctx.method}|${ctx.request.ip}-API`)
            return `${ctx.url}|${ctx.method}|${ctx.ip}-API`;
        },
        message: "操作过快，请稍后再试！"
    });
}