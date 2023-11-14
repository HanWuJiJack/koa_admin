const tools = require('../utils/Tools');
const ExceptionCode = require('../utils/ExceptionCode');
const Schema = require('../model/Model')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const requestIp = require('request-ip');

module.exports = async (ctx, next) => {
    ctx.state.userInfo = {}
    ctx.request.ip = requestIp.getClientIp(ctx.request);
    ctx.ip = ctx.request.ip
    // console.log("ctx.realIp", ctx.headers["x-forwarded-for"])
    await next();
    if (!ctx.body) {
        ctx.body = ExceptionCode.FILE_ROUTER_ERR
    }
    // console.log(ctx.ip, ctx.ips)
    ctx.body.exp = ctx.state.userId && ctx.state.userId.exp
    logger._request.info(`
    [用户:${ctx.state.userInfo.userName}]--
    [id:${ctx.state.userInfo.id}]--
    [ip:${ctx.ip}]--
    [访问:${ctx.url}]--
    [方法: ${ctx.method}]--
    [query:${JSON.stringify(ctx.query)}]--
    [body:${JSON.stringify(ctx.request.body)}]--
    [返回值:${JSON.stringify(ctx.body)}]
    `);
}