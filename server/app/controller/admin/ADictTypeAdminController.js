// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const mongoose = require('mongoose');
const {
    modelSchemas
} = require('./../../utils/ModelSchemas')
const {
    FaasInit
} = require("./../../faas/FaasInit")
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/Logger"))
const AutoID = require('./../../utils/AutoID')
const ApiRatelimit = require("./../../middleware/ApiRatelimit")
const ApiAuth = require("./../../middleware/ApiAuth")

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
        this.url = "/admin/dict-type"
        this.middleLists = {
            "Get|list": [ApiAuth(["system:dictType:list"]), ApiRatelimit(1, 3)],
            Create: [ApiAuth(["system:dictType:post"]), ApiRatelimit(1, 1)],
            "Update:id": [ApiAuth(["system:dictType:put"]), ApiRatelimit(1, 1)],
            "Remove:ids": [ApiAuth(["system:dictType:remove"]), ApiRatelimit(1, 1)],
            "Get|info:id": [ApiAuth(["system:dictType:get"]), ApiRatelimit(1, 3)],
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
                state = 1,
                    dictId,
                    dictLabel,
                    dictValue
            } = this.ctx.request.query
            const {
                page,
                skipIndex
            } = super.pager(this.ctx.request.query)
            const params = {}
            if (dictId) params.dictId = parseInt(dictId);
            params.state = parseInt(state);
            if (dictLabel) params.dictLabel = new RegExp(`${dictLabel}`, 'ig')
            if (dictValue) params.dictValue = new RegExp(`${dictValue}`, 'ig')
            const query = Schema.dictTypeSchema.find(params) // 查询所有数据
            const list = await query.sort({
                id: -1
            }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
            const total = await Schema.dictTypeSchema.countDocuments(params);
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
        try {
            const {
                dictId,
                dictLabel,
                dictValue,
                dictSort,
                state,
                remark
            } = this.ctx.request.body;
            if (!dictId || !dictLabel || !dictValue || !state) {
                this.ctx.body = super.fail({
                    msg: '请填写完整再进行新增提交'
                })
                return;
            } else {
                const currentIndex = await AutoID({
                    code: "dictTypeId"
                })
                const add = new Schema.dictTypeSchema({
                    id: currentIndex,
                    remark,
                    dictId,
                    createByUser: this.ctx.state.userId.id,
                    dictLabel,
                    dictValue,
                    dictSort,
                    state
                });
                await add.save();
                this.ctx.body = super.success({
                    msg: '添加成功'
                })
            }
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }

    async "Update:id"() {
        try {
            const {
                id
            } = this.ctx.params
            const {
                ...params
            } = this.ctx.request.body;
            params.updateTime = new Date();
            params.updateByUser = this.ctx.state.userId.id
            const res = await Schema.dictTypeSchema.findOneAndUpdate({
                id: parseInt(id)
            }, params, {
                new: true
            });
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
    async "Remove:ids"() {
        try {
            const {
                ids
            } = this.ctx.params
            let arrId = ids.split(",").filter((item) => item).map((item) => parseInt(item))
            let res = await Schema.dictTypeSchema.updateMany({
                id: {
                    $in: arrId
                }
            }, {
                state: 2
            });
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
    async "Get|type:code"() {
        try {
            const {
                code
            } = this.ctx.params
            let dictInfo = await Schema.dictSchema.findOne({
                nameCode: code
            })
            const query = await Schema.dictTypeSchema.find({
                dictId: dictInfo.id
            }) // 查询所有数据
            this.ctx.body = super.success({
                data: query,
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }
    async "Get|info:id"() {
        try {
            const {
                id
            } = this.ctx.params
            const params = {}
            if (id) params.id = parseInt(id)
            const query = await Schema.dictTypeSchema.findOne(params) // 查询所有数据
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