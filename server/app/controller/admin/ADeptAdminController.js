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
    TreeDept(rootList, id) {
        var result = []
        for (var i = 0; i < rootList.length; i++) {
            // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
            // 所以给他来个强制转换成字符串，才能正常对比他是否相等
            if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id)) {
                result.push(rootList[i]._doc)
            }
        }
        // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加
        result.map(item => {
            item.children = this.TreeDept(rootList, item._id)
            if (item.children.length === 0) {
                delete item.children
            }
        })
        return result
    }
    async list() {
        const { deptName } = this.ctx.request.query;
        const params = {}
        if (deptName) params.deptName = deptName;
        let rootList = await Schema.deptSchema.find(params) || []
        const deptList = this.TreeDept(rootList, null)
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
