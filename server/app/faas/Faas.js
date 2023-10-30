
const path = require("path")
const Auth = require('./../middleware/Auth');
const Schema = require('../model/Model');
const vm2 = require("../utils/VM");

const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))

exports.faas = async (ctx, next, method) => {
    const { code } = ctx.params
    const faasInfo = await Schema.faasSchema.findOne({ method, code }) // 查询所有数据
    if (faasInfo) {
        if (faasInfo._doc.isAuth === "1") {
            await Auth(ctx, next)
        }
        try {
            ctx.body = await vm2(ctx, next, faasInfo.fn)()
        } catch (error) {
            logger.systemLogger.error('Failed to compile script.', error);
            next(error)
        }
    }

}