const path = require("path")
const Schema = require('../model/Model');
const vm2 = require("../utils/VM");
const ExceptionCode = require('../utils/ExceptionCode');
const {
    logger
} = require(path.join(process.cwd(), "./config/Logger"))

exports.FaasSchedule = async (code, method) => {
    const faasInfo = await Schema.faasSchema.findOne({
        method,
        code,
        state: 1
    }) // 查询所有数据
    if (faasInfo) {
        try {
            ctx.body = await vm2(ctx, faasInfo._doc.fn)()
        } catch (error) {
            logger.error('FAAS:', error);
            if (error.code) {
                throw error
            }
            ExceptionCode.FAAS_UNDEFINED.message = error.message
            throw ExceptionCode.FAAS_UNDEFINED
        }
    } else {
        throw ExceptionCode.FILE_ROUTER_ERR
    }
}