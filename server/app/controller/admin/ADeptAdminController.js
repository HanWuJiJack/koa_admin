// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController.js');
const Schema = require('./../../model/Model.js')
const AutoID = require('./../../utils/AutoID')
const ApiAuth = require('../../utils/ApiAuth.js')

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
    }
    async list() {
        await ApiAuth({
            userInfo: this.userInfo,
            code: ["system:dept:list"]
        })
        const {
            deptName,
            state = 1
        } = this.ctx.request.query;
        const params = {}
        params.state = parseInt(state);
        if (deptName) params.deptName = deptName;
        let rootList = await Schema.deptSchema.find(params) || []
        // console.log(rootList)
        const deptList = super.TreeDept(rootList, null)
        this.ctx.body = super.success({
            data: deptList
        });
    }

    async create() {
        const {
            id,
            action,
            ...params
        } = this.ctx.request.body;
        if (action == 'create') {
            await ApiAuth({
                userInfo: this.userInfo,
                code: ["system:dept:post"]
            })
        } else if (action == 'edit') {
            await ApiAuth({
                userInfo: this.userInfo,
                code: ["system:dept:put"]
            })
        } else {
            await ApiAuth({
                userInfo: this.userInfo,
                code: ["system:dept:remove"]
            })
        }
        let res, info;
        try {
            if (action == 'create') {
                const currentIndex = await AutoID({
                    code: "deptId"
                })
                params.id = currentIndex
                params.createByUser = this.ctx.state.userId.id
                res = await Schema.deptSchema.create(params)
                info = '创建成功'
            } else if (action == 'edit') {
                params.updateTime = new Date();
                params.updateByUser = this.ctx.state.userId.id
                res = await Schema.deptSchema.findOneAndUpdate({
                    id
                }, params);
                info = '编辑成功'
            } else {
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
            }
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