const path = require("path")
const Auth = require('./../middleware/Auth');
const Schema = require('../model/Model');
const vm2 = require("../utils/VM");
const ExceptionCode = require('../utils/ExceptionCode');

const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))

exports.faas = async (ctx, next, method) => {
    const {
        code
    } = ctx.params
    const faasInfo = await Schema.faasSchema.findOne({
        method,
        code,
        state: 1
    }) // 查询所有数据
    if (faasInfo) {
        if (faasInfo._doc.isAuth === "1") {
            await Auth(ctx, next)
        }
        try {
            ctx.body = await vm2(ctx, faasInfo._doc.fn)()
        } catch (error) {
            logger.error('FAAS:', error);
            if (error.code) {
                throw error
            }
            // err 对象的属性说明：
            // message：错误提示信息
            // fileName：表示出错代码所在文件
            // lineNumber：出错代码所在行数
            // stack： 出错堆栈信息
            // name：异常对象名/类型
            ExceptionCode.FAAS_UNDEFINED.message = error.message
            throw ExceptionCode.FAAS_UNDEFINED
        }
    } else {
        throw ExceptionCode.FILE_ROUTER_ERR
    }
}