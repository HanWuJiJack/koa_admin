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
        apiAuth({
            ctx: this.ctx,
            next: this.next,
            code: "list2"
        })
        
        try {
            const {
                userId,
                userName,
                state
            } = this.ctx.request.query;
            const {
                page,
                skipIndex
            } = super.pager(this.ctx.request.query)
            let params = {}
            if (userId) params.userId = userId;
            if (userName) params.userName = userName;
            if (state && state != '0') params.state = parseInt(state);
            // 根据条件查询所有用户列表
            const query = Schema.usersSchema.find(params) //查询所有数据
            const list = await query.skip(skipIndex).limit(page.pageSize) //根据查出的所有数据截取对应页数的数据
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
            userId,
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
            }, '_id userName userEmail');

            if (repeat) {
                this.ctx.body = super.fail({
                    msg: `您新增的用户:邮箱:${repeat.userEmail}已经存在~`
                })
                return;
            } else {
                try {
                    const countDoc = await Schema.counterSchema.findOneAndUpdate({
                        _id: 'userId'
                    }, {
                        $inc: {
                            currentIndex: 1
                        }
                    }, {
                        new: true
                    });
                    const addUser = new Schema.usersSchema({
                        userId: countDoc.currentIndex,
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
                    this.ctx.body = super.fail('添加用户失败，请联系管理员' + error.stack)
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
            const res = await Schema.usersSchema.findOneAndUpdate({
                userId: parseInt(id)
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
            userId
        } = this.ctx.request.body;
        try {
            await Schema.usersSchema.findOneAndUpdate({
                userId
            }, {
                userPwd: hash(userPwd),
            }, {
                new: true
            });
            this.ctx.body = super.success({
                msg: '更新用户数据成功'
            });
        } catch (error) {
            logger.systemLogger.error(error)
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
            userId: {
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