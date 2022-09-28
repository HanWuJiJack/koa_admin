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
            const { roleName } = this.ctx.request.query
            const { page, skipIndex } = super.pager(this.ctx.request.query)
            const params = {}
            if (roleName) params.roleName = new RegExp(`^${roleName}`, 'ig')
            const query = Schema.rolesSchema.find(params) // 查询所有数据
            const list = await query.skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
            const total = await Schema.rolesSchema.countDocuments(params);
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
            const { _id, roleName, remark, action } = this.ctx.request.body;
            if (action === 'create') {
                if (!roleName) {
                    this.ctx.body = super.fail({ msg: '请填写完整再进行新增提交' })
                    return;
                } else {
                    //先查一下是否数据库里已经存在
                    const repeat = await Schema.rolesSchema.findOne({ roleName }, '_id');
                    if (repeat) {
                        this.ctx.body = super.fail({ msg: '您新增的角色:已经存在无需再次添加' })
                        return;
                    } else {
                        try {
                            const addRoles = new Schema.rolesSchema({
                                roleName,
                                remark: remark ? remark : ''
                            });
                            await addRoles.save();
                            this.ctx.body = super.success({ msg: '添加角色成功' })
                        } catch (error) {
                            this.ctx.body = super.fail({ msg: '添加角色失败，请联系管理员' + error.stack })
                        }
                    }
                }
            } else if (action === 'edit') {
                let res = await Schema.rolesSchema.updateOne({ _id }, { roleName, remark })
                if (res.nModified) {
                    this.ctx.body = super.success({ data: res, msg: '修改角色成功！' })
                    return;
                }
                this.ctx.body = fail('修改失败，请联系管理员');
            } else if (action === 'delete') {
                let res = await Schema.rolesSchema.deleteOne({ _id })
                if (res.deletedCount) {
                    this.ctx.body = super.success({ data: res, msg: `共删除成功${res.nModified}条` })
                    return;
                }
                this.ctx.body = super.fail('删除失败');
            }
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }

    async permission() {
        try {
            const { _id, permissionList } = this.ctx.request.body
            let res = await Schema.rolesSchema.updateOne({ _id }, { permissionList })
            if (res.nModified) {
                this.ctx.body = super.success({ data: res, msg: '设置角色权限成功！' })
                return;
            }
            this.ctx.body = super.fail({ msg: '设置角色权限失败，请联系管理员' });
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }


    async all() {
        try {
            const res = await Schema.rolesSchema.find({}, '_id roleName')
            this.ctx.body = super.success({ data: res })
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack })
        }
    }



}

module.exports = UserAdminController;
