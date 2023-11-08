const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const {
    hash
} = require('../../utils/Tools.js')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const AutoID = require('./../../utils/AutoID')
const ApiRatelimit = require("./../../middleware/ApiRatelimit")
const ApiAuth = require("./../../middleware/ApiAuth")

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
        this.userInfo = this.ctx.state.userInfo;
        this.url = "/admin/user"
        this.middleLists = {
            "Get|list": [ApiAuth(["system:user:list"]), ApiRatelimit(1, 3)],
            Create: [ApiAuth(["system:user:post"]), ApiRatelimit(1, 1)],
            "Update|info:id": [ApiAuth(["system:user:put"]), ApiRatelimit(1, 1)],
            "Update|pwd": [ApiAuth(["system:user:put"]), ApiRatelimit(1, 1)],
            Remove: [ApiAuth(["system:user:remove"]), ApiRatelimit(1, 1)],
            "Remove|force": [ApiAuth(["system:user:remove"]), ApiRatelimit(1, 1)],
            "Get|list_all": [ApiAuth(["system:user:list"]), ApiRatelimit(1, 3)],
            "Get|info": [ApiAuth(["system:user:mySelf"]), ApiRatelimit(1, 3)],
        }
    }
    // "Get|list" Get "Get:id"
    // Update "Update:id"
    // Create
    // Remove "Remove:ids"
    // | 代表拼接后端字符串
    // : 代表拼接后端动态路由
    async "Get|list"() {
        try {
            const {
                userId,
                userName,
                state = 1
            } = this.ctx.request.query;
            const {
                page,
                skipIndex
            } = super.pager(this.ctx.request.query)
            let params = {}
            if (userId) params.userId = userId;
            if (userName) params.userName = userName;
            if (state != 0) params.state = parseInt(state);
            // 根据条件查询所有用户列表
            const query = Schema.usersSchema.find(params) //查询所有数据
            const list = await query.sort({
                id: -1
            }).skip(skipIndex).limit(page.pageSize) //根据查出的所有数据截取对应页数的数据
            const total = await Schema.usersSchema.countDocuments(params);
            this.ctx.body = super.success({
                data: {
                    page: {
                        ...page,
                        total
                    },
                    list
                }
            })
        } catch (error) {
            this.ctx.body = super.fail({
                data: {},
                msg: `查询异常:${error.stack}`
            })
        }
    }

    async Create() {
        const {
            id,
            userName,
            userEmail,
            mobile,
            job,
            state,
            roleList,
            deptId,
            action,
            brand,
            company,
            companyAddress,
            InvoiceTitle,
            dutyParagraph,
            expressAddress,
            expressName,
            expressPhone,
        } = this.ctx.request.body;
        this.ctx.verifyParams({
            userName: 'string',
            userEmail: 'string',
            deptId: "array"
        })
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
                    createByUser: this.ctx.state.userId.id,
                    userName,
                    userPwd: hash('123456'),
                    userEmail,
                    role: 1, //1:默认普通用户 0是超级管理员
                    roleList,
                    job,
                    state,
                    deptId,
                    mobile,
                    brand,
                    company,
                    companyAddress,
                    InvoiceTitle,
                    dutyParagraph,
                    expressAddress,
                    expressName,
                    expressPhone,
                });
                await addUser.save();
                this.ctx.body = super.success({}, '添加用户成功')
            } catch (error) {
                this.ctx.body = super.fail({
                    msg: error.stack
                })
            }
        }
    }

    async "Update|info:id"() {
        try {
            const {
                id
            } = this.ctx.params
            const {
                ...params
            } = this.ctx.request.body;
            if (params.userPwd) {
                delete params.userPwd;
            }
            params.updateTime = new Date();
            params.updateByUser = this.ctx.state.userId.id
            const res = await Schema.usersSchema.findOneAndUpdate({
                id: parseInt(id)
            }, params);
            this.ctx.body = super.success({
                data: res,
                msg: '修改成功！'
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }

    async "Update|pwd"() {
        const {
            userPwd,
            id
        } = this.ctx.request.body;
        try {
            await Schema.usersSchema.findOneAndUpdate({
                id
            }, {
                updateTime: new Date(),
                updateByUser: this.ctx.state.userId.id,
                userPwd: hash(userPwd),
            }, {
                new: true
            });
            this.ctx.body = super.success({
                msg: '更新用户数据成功'
            });
        } catch (error) {
            logger.error(error)
            this.ctx.body = super.fail({
                msg: '更新用户数据失败'
            });
        }
    }

    // 支持单个删除
    async Remove() {
        const {
            userIds,
        } = this.ctx.request.body;
        let res = await Schema.usersSchema.updateMany({
            id: {
                $in: userIds
            }
        }, {
            state: 2
        });
        if (res.nModified) {
            this.ctx.body = super.success({
                data: res,
                msg: `共删除成功${res.nModified}条`
            })
            return;
        }
        this.ctx.body = super.fail({
            msg: '删除失败'
        });
    }

    // 永久删除
    async "Remove|force"() {
        try {
            const {
                userIds
            } = this.ctx.request.body;
            let res = await Schema.usersSchema.deleteMany({
                userId: {
                    $in: userIds
                }
            })
            this.ctx.body = super.success({
                data: res,
                msg: `删除成功`
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }
    async "Get|list_all"() {
        try {
            const list = await Schema.usersSchema.find({}) //查询所有数据
            this.ctx.body = super.success({
                data: list
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: `查询异常:${error.stack}`
            })
        }
    }

    async "Get|info"() {
        this.ctx.body = super.success({
            data: this.userInfo
        })
    }
}

module.exports = UserAdminController;