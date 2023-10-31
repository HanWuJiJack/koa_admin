// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const mongoose = require('mongoose');
const {
    modelSchemas
} = require('./../../utils/ModelSchemas')
const {
    initFaas
} = require("./../../faas/InitFaas")
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
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
    }

    async list() {
        try {
            const {
                state,
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
            if (state && state != '0') params.state = parseInt(state);
            if (dictLabel) params.dictLabel = new RegExp(`${dictLabel}`, 'ig')
            if (dictValue) params.dictValue = new RegExp(`${dictValue}`, 'ig')
            const query = Schema.dictTypeSchema.find(params) // 查询所有数据
            const list = await query.skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
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

    async create() {
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
                const countDoc = await Schema.counterSchema.findOneAndUpdate({
                    _id: 'dictTypeId'
                }, {
                    $inc: {
                        currentIndex: 1
                    }
                }, {
                    new: true
                });
                logger.info(`countDoc:${countDoc}`)
                const add = new Schema.dictTypeSchema({
                    id: countDoc.currentIndex,
                    remark,
                    dictId,
                    dictLabel,
                    dictValue,
                    dictSort,
                    state
                });
                await add.save();

                const params = {}
                params.id = parseInt(dictId)
                const query = await Schema.dictSchema.findOne(params)
                if (query._doc.nameCode === "Schema_type") {
                    await initFaas()
                }
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
            const res = await Schema.dictTypeSchema.findOneAndUpdate({
                id: parseInt(id)
            }, params, {
                new: true
            });

            const par = {}
            par.id = parseInt(res._doc.dictId)
            const query = await Schema.dictSchema.findOne(par)
            logger.info(`res._doc.dictId:${res._doc.dictId}`)

            if (query._doc.nameCode === "Schema_type") {
                await initFaas()
            }

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
            const dictTypes = await Schema.dictTypeSchema.find({
                id: {
                    $in: arrId
                }
            })
            logger.info(dictTypes)
            let res = await Schema.dictTypeSchema.deleteMany({
                id: {
                    $in: arrId
                }
            })
            // 删除model
            dictTypes.forEach(item => {
                const arr = item.dictValue.split("-")
                mongoose.deleteModel(arr[1]);
                delete modelSchemas[arr[0]]
            })
            // logger.info("modelSchemas", modelSchemas)
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
    async get_type() {
        try {
            const {
                id
            } = this.ctx.params
            let dictInfo = await Schema.dictSchema.findOne({
                nameCode: id
            })
            const query = await Schema.dictTypeSchema.find({
                dictId: dictInfo.id
            }) // 查询所有数据
            this.ctx.body = super.success({
                data: query,
                msg: `删除成功`
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }
    async get_open_type() {
        try {
            const {
                type
            } = this.ctx.params
            let dictInfo = await Schema.dictSchema.findOne({
                nameCode: type
            })
            const query = await Schema.dictTypeSchema.find({
                dictId: dictInfo.id
            }) // 查询所有数据
            this.ctx.body = query
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