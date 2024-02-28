const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const { encode, code2Session, hash } = require('../../utils/Tools.js')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/Logger"))

class UserAdminController extends BaseController {
    constructor({ ctx = {
        state: {
            userInfo: {}
        }
    }, next }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.userInfo = this.ctx.state.userInfo;
        this.url = "/wx/user"
    }
    // 更新
    async update() {
        const {
            userId,
            userName,
            userEmail,
            mobile,
            job,
            state,
            roleList,
            deptId,
            action,
            // userPwd,
            brand,
            company,
            companyAddress,
            InvoiceTitle,
            dutyParagraph,
            expressAddress,
            expressName,
            expressPhone,
        } = this.ctx.request.body;
        //检测有没有选择部门
        if (!deptId) {
            this.ctx.body = super.fail({ msg: '部门不能为空' })
            return;
        }
        try {
            await Schema.usersSchema.findOneAndUpdate({
                userId
            }, {
                mobile,
                job,
                state,
                roleList,
                deptId,
                userName,
                // userPwd: hash(userPwd),
                brand,
                company,
                companyAddress,
                InvoiceTitle,
                dutyParagraph,
                expressAddress,
                expressName,
                expressPhone,
            }, { new: true });
            this.ctx.body = super.success({ msg: '更新用户数据成功' });
        } catch (error) {
            logger.error(error)
            this.ctx.body = super.fail({ msg: '更新用户数据失败' });
        }
    }
    async create_login() {
        this.ctx.verifyParams({
            userEmail: 'string',
            userPwd: 'string',
            code: 'string',
        })
        try {
            const {
                userEmail,
                userPwd,
                code
            } = this.ctx.request.body;
            const res = await Schema.usersSchema.findOne({
                userEmail,
                userPwd: hash(userPwd),
                state: 1,
            });
            if (res) {
                const { session_key, openid } = await code2Session(code)
                if (res._doc.openid) {
                    this.ctx.body = super.fail({ data: {}, msg: '账号已经被绑定！' });
                    return
                }
                await Schema.usersSchema.findOneAndUpdate({
                    userEmail,
                    userPwd: hash(userPwd)
                }, { openid: openid, session_key: session_key }, { new: true });
                var token = encode(res._doc.userId)
                var data = res._doc;
                data.token = token;
                this.ctx.body = super.success({ data: data, msg: '登陆成功！' });
            } else {
                this.ctx.body = super.fail({ data: {}, msg: '账号被禁用、账号或密码错误！' });
            }
        } catch (error) {
            logger.error(error)
        }
    }
    async create_code_login() {
        try {
            this.ctx.verifyParams({
                code: 'string',
            })
            const {
                code
            } = this.ctx.request.body;
            const { session_key, openid } = await code2Session(code)
            const res = await Schema.usersSchema.findOne({
                openid,
                state: 1,
            });
            if (res) {
                await Schema.usersSchema.findOneAndUpdate({ openid }, { session_key }, { new: true });
                var token = encode(res._doc.userId)
                var data = res._doc;
                data.token = token;
                this.ctx.body = super.success({ data: data, msg: '登陆成功！' });
            } else {
                this.ctx.body = super.fail({ data: {}, msg: '账号被禁用、未绑定账号！' });
            }
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = UserAdminController;
