const tools = require('../utils/Tools');
const ExceptionCode = require('../utils/ExceptionCode');
const Schema = require('../model/Model')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))

function checkAuth(ctx) {
    if (!ctx.header.authorization) {q
        throw ExceptionCode.AUTH_FAILED
    }
    let id = tools.UserId(ctx.header.authorization.split(" ")[1]);
    /* 在这里注入 user 参数 */
    ctx.state.userId = {
        id: id,
    }
}
module.exports = async (ctx, next) => {
    try {
        checkAuth(ctx); // 在这里实现权限控制与参数注入
        const user = await Schema.usersSchema.findOne({
            id: ctx.state.userId.id
        })
        ctx.state.userInfo = user._doc
        if (ctx.state.userInfo.state === 2) {
            throw ExceptionCode.DISABLE_LOGIN
        }
        await next();
    } catch (err) {
        if (err.message === 'token has expired') {
            throw ExceptionCode.AUTH_FAILED
        }
        throw err;
    }
}