// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../base_controller.js');
const Schema = require('./../../model')
const log4js = require('./../../log4js/log')
const { encode } = require('./../../utils/tools')
const ExceptionCode = require('../../exception/code');


class UserAdminController extends BaseController {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.userInfo = ctx.state.userInfo;
    }

    async list() {
        try {
            // console.log("params")
            const { state, dictId } = this.ctx.request.query
            const { page, skipIndex } = super.pager(this.ctx.request.query)
            const params = {}
            if (dictId) params.dictId = parseInt(dictId);
            if (state && state != '0') params.state = parseInt(state);
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
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }

    async create() {
        try {
            const { dictId, dictLabel, dictValue, dictSort, state } = this.ctx.request.body;
            if (!dictId || !dictLabel || !dictValue || !state) {
                this.ctx.body = super.fail({ msg: '请填写完整再进行新增提交' })
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
                const add = new Schema.dictTypeSchema({
                    id: countDoc.currentIndex,
                    dictId,
                    dictLabel,
                    dictValue,
                    dictSort,
                    state
                });
                await add.save();
                this.ctx.body = super.success({ msg: '添加成功' })
            }
        } catch (error) {
            this.ctx.body = super.fail({ msg: '添加失败，请联系管理员' + error.stack })
        }
    }

    async update() {
        try {
            const { id } = this.ctx.params
            const { ...params } = this.ctx.request.body;
            params.updateTime = new Date();
            const res = await Schema.dictTypeSchema.findOneAndUpdate({ id: parseInt(id) }, params,{ new: true });
            this.ctx.body = super.success({ data: res, msg: '修改成功！' })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }
    async remove() {
        try {
            const { ids } = this.ctx.params
            let arrId = ids.split(",").filter((item) => item).map((item) => parseInt(item))
            let res = await Schema.dictTypeSchema.deleteMany({ id: { $in: arrId } })
            this.ctx.body = super.success({ data: res, msg: `删除成功` })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }
    async getType() {
        try {
            const { type } = this.ctx.params
            let dictInfo = await Schema.dictSchema.findOne({ nameCode: type })
            const query = await Schema.dictTypeSchema.find({ dictId: dictInfo.id }) // 查询所有数据
            this.ctx.body = super.success({ data: query, msg: `删除成功` })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }

    async get() {
        try {
            const { id } = this.ctx.params
            const params = {}
            if (id) params.id = parseInt(id)
            const query = await Schema.dictTypeSchema.findOne(params) // 查询所有数据
            this.ctx.body = super.success({
                data: { ...query._doc }

            })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }

}

module.exports = UserAdminController;
