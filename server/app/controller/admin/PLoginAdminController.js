const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const { encode, hash } = require('../../utils/Tools.js')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))

class LoginAdminController extends BaseController {
    constructor({ ctx = {
        state: {
            userInfo: {}
        }
    }, next }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.url = "/admin/p/login"
    }
    async create() {
        this.ctx.verifyParams({
            userEmail: 'string',
            userPwd: 'string',
        })
        try {
            const {
                userEmail,
                userPwd
            } = this.ctx.request.body;
            const res = await Schema.usersSchema.findOne({
                userEmail,
                userPwd: hash(userPwd),
                state: 1,
            });
            if (res) {
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
}

module.exports = LoginAdminController;
