const ExceptionCode = require('./ExceptionCode');
const list = ['list']
module.exports = function ({ctx,next,code}) {
    if(!list.includes(code)){
        throw ExceptionCode.USER_ROLE_NO_PRIVILEGE
    }
}
