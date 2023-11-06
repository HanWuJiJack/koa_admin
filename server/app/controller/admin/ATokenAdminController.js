const BaseController = require('../BaseController');
const Schema = require('../../model/Model.js')
const {
    encode,
    hash
} = require('../../utils/Tools.js')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const AutoID = require('../../utils/AutoID')
const ApiAuth = require('../../utils/ApiAuth.js')
class TokenAdminController extends BaseController {
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
        this.url = "/admin/token"
    }
    async list() {
        try {
            var token = encode(this.userInfo.id)
            this.ctx.body = super.success({
                data: {
                    token
                },
            });
        } catch (error) {
            this.ctx.body = super.fail({
                data: {},
                msg: `查询异常:${error.stack}`
            })
        }
    }
}

module.exports = TokenAdminController;