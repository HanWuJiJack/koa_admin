const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const {
    hash
} = require('../../utils/Tools.js')
const apiAuth = require('../../utils/ApiAuth.js')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const AutoID = require('./../../utils/AutoID')

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
    }
    async list() {
        // 接口级别权限判断
        // await apiAuth({
        //     userInfo: ctx.state.userInfo,
        //     code: ["100017"]
        // })
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
            params.state = parseInt(state);
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

    async create() {
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
        if (action === 'add') {
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
                    this.ctx.body = super.fail({msg: error.stack})
                }
            }
        }
    }

    async update() {
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

    async update_pwd() {
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
    async del() {
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
    async del_force() {
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
    async list_all() {
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

    async list_one() {
        this.ctx.body = super.success({
            data: this.userInfo
        })
    }
}

module.exports = UserAdminController;