// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController');
const Schema = require('../../model/Model.js')
const FaasInit = require("../../faas/FaasInit")
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const AutoID = require('../../utils/AutoID')
class DictTypeAdminController extends BaseController {
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
        this.url = "/admin/model"
    }

    async list() {
        try {
            const {
                state = 1,
                name,
            } = this.ctx.request.query
            const {
                page,
                skipIndex
            } = super.pager(this.ctx.request.query)
            const params = {}
            params.state = parseInt(state);
            if (name) params.name = new RegExp(`${name}`, 'ig')
            const query = Schema.ModelsSchema.find(params) // 查询所有数据
            const list = await query.sort({
                id: -1
            }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
            const total = await Schema.ModelsSchema.countDocuments(params);
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

    async create() {
        try {
            const {
                name,
                func
            } = this.ctx.request.body;
            if (!name || !func) {
                this.ctx.body = super.fail({
                    msg: '请填写完整再进行新增提交'
                })
                return;
            } else {
                const currentIndex = await AutoID({
                    code: "modelID"
                })
                const add = new Schema.ModelsSchema({
                    id: currentIndex,
                    createByUser: this.ctx.state.userId.id,
                    name,
                    func
                });
                await add.save();
                await FaasInit()
                this.ctx.body = super.success({
                    msg: '添加成功'
                })
            }
        } catch (error) {
            this.ctx.body = super.fail({
                msg: '添加失败，请联系管理员' + error.stack
            })
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
            params.updateTime = new Date();
            params.updateByUser = this.ctx.state.userId.id
            const res = await Schema.ModelsSchema.findOneAndUpdate({
                id: parseInt(id)
            }, params, {
                new: true
            });
            await FaasInit()
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
    async remove() {
        try {
            const {
                ids
            } = this.ctx.params
            let arrId = ids.split(",").filter((item) => item).map((item) => parseInt(item))
            let res = await Schema.ModelsSchema.updateMany({
                id: {
                    $in: arrId
                }
            }, {
                state: 2
            });
            await FaasInit()
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
    async get() {
        try {
            const {
                id
            } = this.ctx.params
            const params = {}
            if (id) params.id = parseInt(id)
            const query = await Schema.ModelsSchema.findOne(params) // 查询所有数据
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

}

module.exports = DictTypeAdminController;