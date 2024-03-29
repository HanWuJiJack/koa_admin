// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const AutoID = require('../../utils/AutoID')
const ApiRatelimit = require("./../../middleware/ApiRatelimit")
const ApiAuth = require("./../../middleware/ApiAuth")

class RolesAdminController extends BaseController {
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
        this.url = "/admin/roles"
        this.middleLists = {
            "Get|list": [ApiAuth(["system:role:list"]), ApiRatelimit(1, 3)],
            Create: [ApiAuth(["system:role:post"]), ApiRatelimit(1, 1)],
            Update: [ApiAuth(["system:role:put"]), ApiRatelimit(1, 1)],
            Remove: [ApiAuth(["system:role:remove"]), ApiRatelimit(1, 1)],
            "Update|permission": [ApiAuth(["system:role:put"]), ApiRatelimit(1, 1)],
            "Get|list_all": [ApiAuth(["system:role:list"]), ApiRatelimit(1, 3)],
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
                roleName
            } = this.ctx.request.query
            const {
                page,
                skipIndex,
                state = 1
            } = super.pager(this.ctx.request.query)
            const params = {}
            if (roleName) params.roleName = new RegExp(`^${roleName}`, 'ig')
            params.state = parseInt(state);
            const query = Schema.rolesSchema.find(params) // 查询所有数据
            const list = await query.sort({
                id: -1
            }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
            const total = await Schema.rolesSchema.countDocuments(params);
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
                msg: error.stack
            })
        }
    }

    async Create() {
        const {
            roleName,
            remark,
        } = this.ctx.request.body;

        try {
            if (!roleName) {
                this.ctx.body = super.fail({
                    msg: '请填写完整再进行新增提交'
                })
                return;
            } else {
                //先查一下是否数据库里已经存在
                const repeat = await Schema.rolesSchema.findOne({
                    roleName
                }, 'id');
                if (repeat) {
                    this.ctx.body = super.fail({
                        msg: '您新增的角色:已经存在无需再次添加'
                    })
                    return;
                } else {
                    try {
                        const currentIndex = await AutoID({
                            code: "roleId"
                        })
                        const addRoles = new Schema.rolesSchema({
                            id: currentIndex,
                            createByUser: this.ctx.state.userId.id,
                            roleName,
                            remark: remark ? remark : ''
                        });
                        await addRoles.save();
                        this.ctx.body = super.success({
                            msg: '添加角色成功'
                        })
                    } catch (error) {
                        this.ctx.body = super.fail({
                            msg: '添加角色失败，请联系管理员' + error.stack
                        })
                    }
                }
            }
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }
    async Update() {
        const {
            id,
            roleName,
            remark,
            action
        } = this.ctx.request.body;
        try {
            let res = await Schema.rolesSchema.updateOne({
                id
            }, {
                roleName,
                remark,
                updateTime: new Date(),
                updateByUser: this.ctx.state.userId.id
            })
            this.ctx.body = super.success({
                data: res,
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }
    async Remove() {
        const {
            id,
        } = this.ctx.request.body;
        try {
            const usersInfo = await Schema.usersSchema.findOne({
                roleList: {
                    $all: [id]
                }
            })
            if (usersInfo) {
                this.ctx.body = super.fail({
                    msg: "请先将人员中该角色删除！"
                });
                return
            }
            let res = await Schema.rolesSchema.updateOne({
                id
            }, {
                state: 2
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

    async "Update|permission"() {
        try {
            const {
                id,
                permissionList
            } = this.ctx.request.body
            let res = await Schema.rolesSchema.updateOne({
                id
            }, {
                permissionList
            })
            this.ctx.body = super.success({
                data: res,
            })
            return;
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }


    async "Get|list_all"() {
        try {
            const res = await Schema.rolesSchema.find({}, 'id roleName')
            this.ctx.body = super.success({
                data: res
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }



}

module.exports = RolesAdminController;