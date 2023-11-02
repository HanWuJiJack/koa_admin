// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')


class FaasAdminController extends BaseController {
    constructor({ ctx = {
        state: {
            userInfo: {}
        }
    }, next }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.userInfo = this.ctx.state.userInfo;
        this.url = "/admin/faas"
    }

    async list() {
        try {
            const { method, code, state } = this.ctx.request.query
            const { page, skipIndex } = super.pager(this.ctx.request.query)
            const params = {}
            if (method) params.method = new RegExp(`^${method}`, 'ig')
            if (code) params.code = new RegExp(`^${code}`, 'ig')
            if (state && state != '0') params.state = parseInt(state);
            const query = Schema.faasSchema.find(params) // 查询所有数据
            // sort({ _id: -1 }) 倒叙 1正序
            const list = await query.sort({ _id: -1 }).skip(skipIndex).limit(page.pageSize).exec() // 根据查出的所有数据截取对应页数的数据
            const total = await Schema.faasSchema.countDocuments(params);
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
            const { method, fn, code, schemaCode, state, path, isAuth, remark } = this.ctx.request.body;
            if (!method || !fn || !code) {
                this.ctx.body = super.fail({ msg: '请填写完整再进行新增提交' })
                return;
            } else {
                // let check = await Schema.faasSchema.findOne({ code })
                // if (check) {
                //     this.ctx.body = super.fail({ msg: '添加失败，请联系管理员:code不可重复！' })
                //     return
                // }
                const add = new Schema.faasSchema({
                    method, fn, code, path, isAuth,
                    schemaCode,
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
            const res = await Schema.faasSchema.findOneAndUpdate({ _id: id }, params, { new: true });
            this.ctx.body = super.success({ data: res, msg: '修改成功！' })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }

    async remove() {
        try {
            const { ids } = this.ctx.params
            let arrId = ids.split(",").filter((item) => item)
            let res = await Schema.faasSchema.deleteMany({ _id: { $in: arrId } })
            this.ctx.body = super.success({ data: res, msg: `删除成功` })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }
    async get() {
        try {
            const { id } = this.ctx.params
            const params = {}
            if (id) params._id = id
            const query = await Schema.faasSchema.findOne(params) // 查询所有数据
            this.ctx.body = super.success({
                data: { ...query._doc }
            })
        } catch (error) {
            this.ctx.body = super.fail(error.stack)
        }
    }
}

module.exports = FaasAdminController;
