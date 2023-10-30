'use strict'
// 文件上传配置
var formidable = require('formidable');
const config = require("../../config/FileExt")

module.exports = function (opt) {
    return async function (ctx, next) {
        const form = new formidable.IncomingForm()
        for (const key in opt) {
            if (key.slice(0, 2) == "on") {
                let key_ = key.slice(2)
                form.on(key_, opt[key])
            } else {
                form[key] = opt[key]
            }
        }
        await new Promise((reslove, reject) => {
            form.parse(ctx.req, (err, fields, files) => {
                if (err) {
                    if (err.message.indexOf("maxFileSize exceeded") > -1) {
                        reject(new Error(`文件应该小于${process.env.MAX_FILE_SIZE}m`))
                    }
                    reject(err)
                } else {
                    ctx.request.body = fields
                    ctx.request.files = files
                    reslove()
                }
            })
            form.onPart = (part) => {
                let ext = part.filename.split('.').pop()
                if (config.fileTypes.includes(ext)) {
                    form.handlePart(part)
                } else {
                    reject(new Error(`文件格式只支持${config.fileTypes.join("、")}`))
                }
            }
        })
        await next()
    }
}