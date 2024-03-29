const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const AutoID = require('./../../utils/AutoID')
const path = require("path")
const {
    logger,
} = require(path.join(process.cwd(), "./config/Logger"))
const ApiRatelimit = require("./../../middleware/ApiRatelimit")
const ApiAuth = require("./../../middleware/ApiAuth")


class DictAdminController extends BaseController {
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
        this.url = "/admin/dict"
        this.middleLists = {
            "Get|list": [ApiAuth(["system:dict:list"]), ApiRatelimit(1, 3)],
            Create: [ApiAuth(["system:dict:post"]), ApiRatelimit(1, 1)],
            "Update:id": [ApiAuth(["system:dict:put"]), ApiRatelimit(1, 1)],
            "Remove:ids": [ApiAuth(["system:dict:remove"]), ApiRatelimit(1, 1)],
            "Get|info:id": [ApiAuth(["system:dict:get"]), ApiRatelimit(1, 3)],
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
                name,
                nameCode,
                state = 1
            } = this.ctx.request.query
            const {
                page,
                skipIndex
            } = super.pager(this.ctx.request.query)
            const params = {}
            if (name) params.name = new RegExp(`^${name}`, 'ig')
            if (nameCode) params.nameCode = new RegExp(`^${nameCode}`, 'ig')
            params.state = parseInt(state);
            const query = Schema.dictSchema.find(params) // 查询所有数据
            const list = await query.sort({
                id: -1
            }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
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
            this.ctx.body = super.fail({
                msg: error.stack
            })
        }
    }

    async Create() {
        try {
            const {
                name,
                nameCode,
                state,
                remark
            } = this.ctx.request.body;
            if (!name || !nameCode) {
                this.ctx.body = super.fail({
                    msg: '请填写完整再进行新增提交'
                })
                return;
            } else {
                let check = await Schema.dictSchema.findOne({
                    nameCode
                })
                if (check) {
                    this.ctx.body = super.fail({
                        msg: '添加失败，请联系管理员:字典类型不可重复！'
                    })
                    return
                }
                const currentIndex = await AutoID({
                    code: "dictId"
                })

                const add = new Schema.dictSchema({
                    id: currentIndex,
                    name,
                    createByUser: this.ctx.state.userId.id,
                    nameCode,
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
            const res = await Schema.dictSchema.findOneAndUpdate({
                id: parseInt(id)
            }, params);
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
            // 
            let dictTypes = await Schema.dictTypeSchema.find({
                dictId: {
                    $in: arrId
                },
                state: 1
            })
            if (!dictTypes[0]) {
                let res = await Schema.dictSchema.updateMany({
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
            } else {
                // logger.info(`3dictTypes=>:${dictTypes}`)
                this.ctx.body = super.fail({
                    msg: "请先删除字典类型"
                })
            }

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
            const query = await Schema.dictSchema.findOne(params) // 查询所有数据
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

module.exports = DictAdminController;