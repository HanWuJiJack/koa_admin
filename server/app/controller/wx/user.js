// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../base_controller.js');
const Schema = require('./../../model')
const log4js = require('./../../log4js/log')
const { encode, code2Session, hash } = require('./../../utils/tools')
const ExceptionCode = require('../../exception/code');

class UserAdminController extends BaseController {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.userInfo = ctx.state.userInfo;
    }
    // 更新
    async create() {
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
            console.log(error)
            this.ctx.body = super.fail({ msg: '更新用户数据失败' });
        }
    }
    async login() {
        try {
            this.ctx.verifyParams({
                userEmail: 'string',
                userPwd: 'string',
                code: 'string',
            })
            const {
                userEmail,
                userPwd,
                code
            } = this.ctx.request.body;
            const res = await Schema.usersSchema.findOne({
                userEmail,
                userPwd: hash(userPwd),
                state: 1,
            }, 'userId userName userEmail state');
            if (res) {
                const { session_key, openid } = await code2Session(code)
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
            console.log(error)
            log4js.log(error.msg, "e");
        }
    }
    async codeLogin() {
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
            // const res = await Schema.usersSchema.findOne({
            //     openid,
            //     state: 1,
            // }, 'userId userName userEmail state role deptId roleList session_key');
            // projection:'userId userName userEmail state role deptId roleList session_key'
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
            console.log(error)
            log4js.log(error.msg, "e");
        }
    }
}

module.exports = UserAdminController;
