const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')

class UserAdminController extends BaseController {
    constructor({ ctx = {
        state: {
            userInfo: {}
        }
    }, next }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.url = "/admin/p/user"
    }
    async list() {
        try {
            const list = await Schema.usersSchema.find({}, '', {
                projection: "_id userName"
            }) //查询所有数据
            this.ctx.body = list
        } catch (error) {
            this.ctx.body = super.fail({ msg: `查询异常:${error.stack}` })
        }
    }
}

module.exports = UserAdminController;
