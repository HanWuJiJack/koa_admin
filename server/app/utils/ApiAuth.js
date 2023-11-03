const ExceptionCode = require('./ExceptionCode');
const path = require("path")
const redis = require(path.join(process.cwd(), "./config/Redis"))

module.exports = async function ({
    userInfo={},
    code
}) {
    if (!userInfo.id) {
        throw ExceptionCode.LOGIN_VERIFY_API
    }
    const {
        btnList
    } = await redis.getHashMap(String(userInfo.id))
    for (let i = 0; i < code.length; i++) {
        if (btnList.includes(code[i])) {
            return
        }
    }
    throw ExceptionCode.USER_ROLE_NO_PRIVILEGE
}