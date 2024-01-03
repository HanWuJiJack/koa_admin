const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const {
    getPublicKey
} = require("../../utils/Tools_rsa.js")
const ApiRatelimit = require("./../../middleware/ApiRatelimit")


class PublicRasController extends BaseController {
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
        this.url = "/blog/ras"
        this.middleLists = {
            Get: [ApiRatelimit(2, 1)],
        }
    }
    // "Get|list" Get "Get:id"
    // Update "Update:id"
    // Create
    // Remove "Remove:ids"
    // | 代表拼接后端字符串
    // : 代表拼接后端动态路由
    async Get() {
        try {
            const publicKey = getPublicKey()
            this.ctx.body = super.success({
                data: {
                    publicKey: publicKey.toString()
                }
            })
        } catch (error) {
            this.ctx.body = super.fail({
                msg: `查询异常:${error.stack}`
            })
        }
    }

}

module.exports = PublicRasController;