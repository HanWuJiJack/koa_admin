const BaseController = require('../BaseController');
const Schema = require('../../model/Model.js')
const path = require("path")
const ExceptionCode = require("../../utils/ExceptionCode")
const redis = require(path.join(process.cwd(), "./config/Redis"))
const AutoID = require('./../../utils/AutoID')
const {
    encode,
    hash,
    getRandom
} = require('../../utils/Tools.js')
const sendEmail = require('../../utils/Nodemailer')
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const ApiAuth = require('../../utils/ApiAuth.js')
const ApiRatelimit = require("../../middleware/ApiRatelimit")
class LoginAdminController extends BaseController {
    constructor({
        ctx = {
            state: {
                userInfo: {}
            }
        },
        next
    }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.url = "/blog"
        this.middleLists = {
            "Create|register": [ApiRatelimit(1, 1)],
            // "Get|code": [ApiRatelimit(60, 1, "注意：60s内只能获取一次code!")],
        }
    }
    // "Get|list" Get "Get:id"
    // Update "Update:id"
    // Create
    // Remove "Remove:ids"
    // | 代表拼接后端字符串
    // : 代表拼接后端动态路由

    async "Create|register"() {
        const {
            userEmail,
            userPwd,
            code,
        } = this.ctx.request.body;
        this.ctx.verifyParams({
            userEmail: 'email',
            userPwd: 'string',
            code: 'string',
        })
        const redisCode = await redis.getString(userEmail)
        if (!redisCode || redisCode != code) {
            throw ExceptionCode.FILE_EMAIL_CODE_ERR
        }
        //先查一下是否数据库里已经存在
        const repeat = await Schema.usersSchema.findOne({
            $or: [{
                userEmail
            }]
        }, 'id userName userEmail');
        if (repeat) {
            this.ctx.body = super.fail({
                msg: `您新增的用户:邮箱:${repeat.userEmail}已经存在~`
            })
            return;
        } else {
            try {
                const currentIndex = await AutoID({
                    code: "userId"
                })
                const addUser = new Schema.usersSchema({
                    id: currentIndex,
                    userPwd: hash(userPwd),
                    userEmail,
                    role: 1,
                    state: 1,
                    deptId: [29],
                });
                await addUser.save();
                this.ctx.body = super.success({}, '注册成功')
            } catch (error) {
                this.ctx.body = super.fail({
                    msg: error.stack
                })
            }
        }
    }
    async "Get|code"() {
        const {
            userEmail,
        } = this.ctx.request.query;
        this.ctx.verifyParams({
            userEmail: 'email',
        })
        try {
            const isSend = await redis.getString(userEmail)
            if (isSend) {
                this.ctx.body = super.fail({
                    msg: "注意：60s内只能获取一次code!"
                })
                return
            }
            const code = getRandom(100000, 999999).toString()
            await sendEmail(userEmail, code)
            await redis.setString(userEmail, code, 120)
            this.ctx.body = super.success({
                msg: "发送成功"
            })
        } catch (error) {
            if (error.stack.indexOf("Message failed: 550 The recipient may contain a non-existent account") > 0) {
                this.ctx.body = super.fail({
                    msg: "不存在该邮箱！"
                })
                return
            }
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }

    }
}

module.exports = LoginAdminController;