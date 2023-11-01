const ExceptionCode = require('./ExceptionCode');
const path = require("path")
const redis = require(path.join(process.cwd(), "./config/Redis"))

module.exports = async function ({
    ctx,
    code
}) {
    userInfo = ctx.state.userInfo;
    if(!userInfo){
        throw ExceptionCode.LOGIN_FAILED
    }
    const {btnList} = await redis.getHashMap(String(userInfo._id))
    // console.log("codeList", codeList)
    for (let i = 0; i < code.length; i++) {
        if (btnList.includes(code[i])) {
            return
        }
    }
    throw ExceptionCode.USER_ROLE_NO_PRIVILEGE
}
