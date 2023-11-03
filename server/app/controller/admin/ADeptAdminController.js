// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController.js');
const Schema = require('./../../model/Model.js')
const AutoID = require('./../../utils/AutoID')

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
    }
    async list() {
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
                // console.log("deptInfo", deptInfo)
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