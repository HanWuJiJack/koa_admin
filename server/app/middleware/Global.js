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
    // console.log("ctx.body",ctx.body)
    if(!ctx.body){
        ctx.body = ExceptionCode.FILE_ROUTER_ERR
    }
    logger._request.info(`
    [用户:${ctx.state.userInfo.userName}]--
    [id:${ctx.state.userInfo.userId}]--
    [访问 ${ctx.url}]--[query:${JSON.stringify(ctx.query)}]--
    [body:${JSON.stringify(ctx.request.body)}]--
    [返回值:${JSON.stringify(ctx.body)}]
    `);
}