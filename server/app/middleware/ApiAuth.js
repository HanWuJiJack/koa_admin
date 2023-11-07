const tools = require('../utils/Tools');
const ExceptionCode = require('../utils/ExceptionCode');
const Schema = require('../model/Model')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const redis = require(path.join(process.cwd(), "./config/Redis"))

const ApiAuth = async (code, ctx, next) => {
    const userInfo = ctx.state.userInfo
    if (!userInfo.id) {
        ctx.body = ExceptionCode.LOGIN_VERIFY_API
        return
    }
    const {
        btnList
    } = await redis.getHashMap(String(userInfo.id))
    let sum = 0
    for (let i = 0; i < code.length; i++) {
        if (btnList.includes(code[i])) {
            sum ++
        }
    }
    if(sum === 0){
        ctx.body = ExceptionCode.USER_ROLE_NO_PRIVILEGE
        return
    }else{
        await next();
    }
}

module.exports  = (code) => {
    return ApiAuth.bind(this, code)
}

