const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const AutoID = require('./../../utils/AutoID')
const ApiAuth = require('../../utils/ApiAuth.js')

class FaasAdminController extends BaseController {
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
        this.url = "/admin/faas"
    }

    async list() {
        await ApiAuth({
            userInfo: this.userInfo,
            code: ["faas:func:list"]
        })
        try {
            const {
                method,
                code,
                state = 1
            } = this.ctx.request.query
            const {
                page,
                skipIndex
            } = super.pager(this.ctx.request.query)
            const params = {}
            if (method) params.method = new RegExp(`^${method}`, 'ig')
            if (code) params.code = new RegExp(`^${code}`, 'ig')
            params.state = parseInt(state);
            const query = Schema.faasSchema.find(params) // 查询所有数据
            // sort({ id: -1 }) //倒叙 1正序
            const list = await query.sort({
                id: -1
            }).skip(skipIndex).limit(page.pageSize).exec() // 根据查出的所有数据截取对应页数的数据
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
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }

    async create() {
        await ApiAuth({
            userInfo: this.userInfo,
            code: ["faas:func:post"]
        })
        try {
            const {
                method,
                fn,
                code,
                schemaCode,
                state,
                path,
                isAuth,
                remark
            } = this.ctx.request.body;
            if (!method || !fn || !code) {
                this.ctx.body = super.fail({
                    msg: '请填写完整再进行新增提交'
                })
                return;
            } else {
                const currentIndex = await AutoID({
                    code: "faasFuncId"
                })
                const add = new Schema.faasSchema({
                    id: currentIndex,
                    createByUser: this.ctx.state.userId.id,
                    method,
                    fn,
                    code,
                    path,
                    isAuth,
                    schemaCode,
                    state: state ? state : undefined,
                    remark: remark ? remark : ''
                });
                await add.save();
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
        await ApiAuth({
            userInfo: this.userInfo,
            code: ["faas:func:put"]
        })
        try {
            const {
                id
            } = this.ctx.params
            const {
                ...params
            } = this.ctx.request.body;
            params.updateTime = new Date();
            params.updateByUser = this.ctx.state.userId.id
            const res = await Schema.faasSchema.findOneAndUpdate({
                id: id
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

    async remove() {
        await ApiAuth({
            userInfo: this.userInfo,
            code: ["faas:func:remove"]
        })
        try {
            const {
                ids
            } = this.ctx.params
            let arrId = ids.split(",").filter((item) => item)
            // let res = await Schema.faasSchema.deleteMany({
            //     id: {
            //         $in: arrId
            //     }
            // })
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
    async get() {
        await ApiAuth({
            userInfo: this.userInfo,
            code: ["faas:func:get"]
        })
        try {
            const {
                id
            } = this.ctx.params
            const params = {}
            if (id) params.id = id
            const query = await Schema.faasSchema.findOne(params) // 查询所有数据
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

module.exports = FaasAdminController;