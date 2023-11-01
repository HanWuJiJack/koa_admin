const ExceptionCode = require('../utils/ExceptionCode');
const { decrypt } = require("../utils/Tools_rsa")
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))

const Exception = async (ctx, next) => {
    let start = new Date();
    try {
        if (ctx.request.body && ctx.request.body.isEncrypt) {
            for (const key in ctx.request.body) {
                if (Object.hasOwnProperty.call(ctx.request.body, key)) {
                    if (key !== "isEncrypt") {
                        ctx.request.body[key] = decrypt(ctx.request.body[key])
                    }
                }
            }
        }
        await next();
        // 处理字段验证报错
        if (ctx.body && ctx.body.message === 'Validation Failed') {
            throw { ...ExceptionCode.INVALID_PARAMS, message: ctx.body.errors };
        }
        // 处理404
        if (ctx.response.status === 404) {
            ctx.body = ExceptionCode.FILE_ROUTER_ERR;
        }
        logger.info(`'SUCCESS'|  ${ctx.method} |  ${ctx.url} |  ${new Date() - start}ms`);
        return ctx.body
    } catch (error) {
        logger.info("GlobalError=>", error)
        if (error && error.code) {
            // 错误类code :1000 - 2000
            if (error.code >= 1000 && error.code < 2000) {
                const status = error.code === 1003 ? 401 : 403
                ctx.response.status = status
                ctx.body = error
            }

            // 通知类code:2000 - 6000
            if (error.code >= 2000 && error.code < 6000) {
                const status = 200
                ctx.response.status = status
                ctx.body = error
            }
        } else if (ctx.response.status && ctx.response.status >= 500) {
            ctx.body = {
                code: 999999,
                message: "请将接口保存并联系后端！"
            }
        } else if (error || ctx.response.status) {
            // ctx.body = ExceptionCode.UNDEFINED
            if (error.message === 'Validation Failed') {
                ctx.body = { ...ExceptionCode.INVALID_PARAMS };
            }
            if (error.message === 'Validation error') {
                ctx.body = { ...ExceptionCode.INVALID_PARAMS };
            }

            if (error.message.indexOf("文件大于") > -1) {
                ctx.body = { ...ExceptionCode.FILE_SIZE_ERR, title: error.message };
            }
            if (error.message.indexOf("文件格式只支持") > -1) {
                ctx.body = { ...ExceptionCode.FILE_TYPE_ERR, title: error.message };
            }
        }
        logger.info(`'ERROR'|  ${ctx.method} |  ${ctx.url} |  ${new Date() - start}ms `);
        return ctx.body
    }
}



module.exports = Exception;