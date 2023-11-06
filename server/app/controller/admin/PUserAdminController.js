const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const AutoID = require('./../../utils/AutoID')
const {
    hash
} = require('../../utils/Tools.js')
class UserAdminController extends BaseController {
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
        this.url = "/admin/p/user"
    }
    async list() {
        try {
            const list = await Schema.usersSchema.find({}, '', {
                projection: "id userName"
            }) //查询所有数据
            this.ctx.body = list
        } catch (error) {
            this.ctx.body = super.fail({
                msg: `查询异常:${error.stack}`
            })
        }
    }
    async create() {
        const {
            userName,
            userEmail,
        } = this.ctx.request.body;
        this.ctx.verifyParams({
            userName: 'string',
            userEmail: 'string',
        })
        //先查一下是否数据库里已经存在
        const repeat = await Schema.usersSchema.findOne({
            $or: [{
                userEmail
            }]
        }, 'id userName userEmail');
        // console.log(repeat)
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
                // console.log(currentIndex)
                const addUser = new Schema.usersSchema({
                    id: currentIndex,
                    // createByUser: this.ctx.state.userId.id,
                    userName,
                    userPwd: hash('123456'),
                    userEmail,
                    role: 0, //1:默认普通用户 0是超级管理员
                });
                await addUser.save();
                this.ctx.body = super.success({}, '添加用户成功')
            } catch (error) {
                // console.log(error)
                this.ctx.body = super.fail({
                    msg: error.stack
                })
            }
        }
    }
}

module.exports = UserAdminController;