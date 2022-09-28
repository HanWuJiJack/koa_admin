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
            const { name, nameCode, state } = this.ctx.request.query
            const { page, skipIndex } = super.pager(this.ctx.request.query)
            const params = {}
            // console.log("params", state)
            if (name) params.name = new RegExp(`^${name}`, 'ig')
            if (nameCode) params.nameCode = new RegExp(`^${nameCode}`, 'ig')
            if (state && state != '0') params.state = parseInt(state);
            // console.log("params", params)
            const query = Schema.dictSchema.find(params) // 查询所有数据
            const list = await query.skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
            const total = await Schema.dictSchema.countDocuments(params);
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
            const { name, nameCode, state, remark } = this.ctx.request.body;
            if (!name || !nameCode) {
                this.ctx.body = super.fail({ msg: '请填写完整再进行新增提交' })
                return;
            } else {
                const countDoc = await Schema.counterSchema.findOneAndUpdate({
                    _id: 'dictId'
                }, {
                    $inc: {
                        currentIndex: 1
                    }
                }, {
                    new: true
                });
                let check = await Schema.dictSchema.findOne({ nameCode })
                if (check) {
                    this.ctx.body = super.fail({ msg:'添加失败，请联系管理员:字典类型不可重复！'})
                    return
                }
                const add = new Schema.dictSchema({
                    id: countDoc.currentIndex,
                    name,
                    nameCode,
                    state: state ? state : undefined,
                    remark: remark ? remark : ''
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
            const res = await Schema.dictSchema.findOneAndUpdate({ id: parseInt(id) }, params);
            this.ctx.body = super.success({ data: res, msg: '修改成功！' })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }

    async remove() {
        try {
            const { ids } = this.ctx.params
            let arrId = ids.split(",").filter((item) => item).map((item) => parseInt(item))
            let res = await Schema.dictSchema.deleteMany({ id: { $in: arrId } })
            this.ctx.body = super.success({ data: res, msg: `删除成功` })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }
    async get() {
        try {
            const { id } = this.ctx.params
            const params = {}
            if (id) params.id = parseInt(id)
            const query = await Schema.dictSchema.findOne(params) // 查询所有数据
            this.ctx.body = super.success({
                data: { ...query._doc }
            })
        } catch (error) {
            this.ctx.body = super.fail(error.stack)
        }
    }
}

module.exports = UserAdminController;
