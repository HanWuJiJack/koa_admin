// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController.js');
const Schema = require('./../../model/Model.js')
const AutoID = require('./../../utils/AutoID')
const ApiRatelimit = require("./../../middleware/ApiRatelimit")
const ApiAuth = require("./../../middleware/ApiAuth")

class DeptAdminController extends BaseController {
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
        this.url = "/admin/dept"
        this.limit = ["list"]
        this.middleLists = {
            "Get|list": [ApiAuth(["system:dept:list"]), ApiRatelimit(1, 3)],
            Create: [ApiAuth(["system:dept:post"]), ApiRatelimit(1, 1)],
            Update: [ApiAuth(["system:dept:put"]), ApiRatelimit(1, 1)],
            Remove: [ApiAuth(["system:dept:remove"]), ApiRatelimit(1, 1)],
            "Get|info:id": [ApiAuth(["system:dept:get"]), ApiRatelimit(1, 3)],
        }
    }
    // "Get|list" Get "Get:id"
    // Update "Update:id"
    // Create
    // Remove "Remove:ids"
    // | 代表拼接后端字符串
    // : 代表拼接后端动态路由

    async "Get|list"() {
        const {
            deptName,
            state = 1
        } = this.ctx.request.query;
        const params = {}
        params.state = parseInt(state);
        if (deptName) params.deptName = deptName;
        let rootList = await Schema.deptSchema.find(params) || []
        const deptList = super.TreeDept(rootList, null)
        this.ctx.body = super.success({
            data: deptList
        });
    }
    async Update() {
        const {
            id,
            action,
            ...params
        } = this.ctx.request.body;
        let res, info;
        try {
            params.updateTime = new Date();
            params.updateByUser = this.ctx.state.userId.id
            res = await Schema.deptSchema.findOneAndUpdate({
                id
            }, params);
            info = '编辑成功'
            this.ctx.body = super.success({
                msg: info
            });
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            });
        }
    }
    async Remove() {
        const {
            id,
            action,
        } = this.ctx.request.body;
        let res, info;
        try {
            const deptInfo = await Schema.deptSchema.findOne({
                parentId: {
                    $all: [id]
                }
            })
            if (deptInfo) {
                this.ctx.body = super.fail({
                    msg: "请先将子集删除！"
                });
                return
            }
            // res = await Schema.deptSchema.findByIdAndRemove(id)
            res = await Schema.deptSchema.findOneAndUpdate({
                id
            }, {
                state: 2
            });
            info = '删除成功'
            this.ctx.body = super.success({
                msg: info
            });
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            });
        }
    }
    async "Get|info:id"() {
        try {
            const {
                id
            } = this.ctx.params
            const params = {}
            if (id) params.id = parseInt(id)
            const query = await Schema.deptSchema.findOne(params) // 查询所有数据
            this.ctx.body = super.success({
                data: {
                    ...query._doc
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
            id,
            action,
            ...params
        } = this.ctx.request.body;
        let res, info;
        try {
            const currentIndex = await AutoID({
                code: "deptId"
            })
            params.id = currentIndex
            params.createByUser = this.ctx.state.userId.id
            res = await Schema.deptSchema.create(params)
            info = '创建成功'
            this.ctx.body = super.success({
                msg: info
            });
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            });
        }
    }
}

module.exports = DeptAdminController;