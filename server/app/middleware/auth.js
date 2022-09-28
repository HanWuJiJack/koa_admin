const tools = require('../utils/tools');
const ExceptionCode = require('../exception/code');
const Schema = require('./../model/index')
const { decrypt } = require("./../utils/tools_rsa")

function checkAuth(ctx) {
    if (!ctx.header.authorization) {
        throw ExceptionCode.AUTH_FAILED
    }
    let id = tools.UserId(ctx.header.authorization.split(" ")[1]);
    console.log(`用户${id} 访问 ${ctx.url}`);
    /* 在这里注入 user 参数 */
    ctx.state.userId = {
        id: id,
    }
}


module.exports = async (ctx, next) => {
    try {
        checkAuth(ctx); // 在这里实现权限控制与参数注入
        // console.log("ctx.state", ctx.state)
        const user = await Schema.usersSchema.findOne({
            userId: ctx.state.userId.id
        })
        ctx.state.userInfo = user._doc
        if (ctx.state.userInfo.state === 2) {
            throw ExceptionCode.DISABLE_LOGIN
        }
        // throw ExceptionCode.DISABLE_LOGIN
        // console.log("ctx.state", ctx.state)
        await next();
    } catch (err) {
        if (err.message === 'token has expired') {
            throw ExceptionCode.AUTH_FAILED
        }
        throw err;
    }
}