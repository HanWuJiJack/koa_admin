const tools = require('../utils/Tools');
const ExceptionCode = require('../utils/ExceptionCode');
const Schema = require('../model/Model')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))

module.exports = async (ctx, next) => {
    ctx.state.userInfo = {}

    await next();
    // console.log("ctx.state.userId.exp", ctx.state.userId && ctx.state.userId.exp)
    if (!ctx.body) {
        ctx.body = ExceptionCode.FILE_ROUTER_ERR
    }
    ctx.body.exp = ctx.state.userId && ctx.state.userId.exp
    logger._request.info(`
    [用户:${ctx.state.userInfo.userName}]--
    [id:${ctx.state.userInfo.id}]--
    [访问 ${ctx.url}]--[query:${JSON.stringify(ctx.query)}]--
    [body:${JSON.stringify(ctx.request.body)}]--
    [返回值:${JSON.stringify(ctx.body)}]
    `);
}