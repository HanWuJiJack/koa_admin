// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController.js');
const Schema = require('./../../model/Model.js')


class DeptAdminController extends BaseController {
    constructor({ ctx = {
        state: {
            userInfo: {}
        }
    }, next }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.userInfo = this.ctx.state.userInfo;
        this.url = "/admin/dept"
    }
    async list() {
        const { deptName } = this.ctx.request.query;
        const params = {}
        if (deptName) params.deptName = deptName;
        let rootList = await Schema.deptSchema.find(params) || []
        const deptList = super.TreeDept(rootList, null)
        this.ctx.body = super.success({ data: deptList });
    }

    async create() {
        const { _id, action, ...params } = this.ctx.request.body;
        let res, info;
        try {
            if (action == 'create') {
                res = await Schema.deptSchema.create(params)
                info = '创建成功'
            } else if (action == 'edit') {
                params.updateTime = new Date();
                res = await Schema.deptSchema.findByIdAndUpdate(_id, params);
                info = '编辑成功'
            } else {
                res = await Schema.deptSchema.findByIdAndRemove(_id)
                await Schema.deptSchema.deleteMany({ parentId: { $all: [_id] } })
                info = '删除成功'
            }
            this.ctx.body = super.success({ msg: info });
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack });
        }
    }
}

module.exports = DeptAdminController;
