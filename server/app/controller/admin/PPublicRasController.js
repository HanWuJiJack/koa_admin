const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const { getPublicKey } = require("../../utils/Tools_rsa.js")



class PublicRasController extends BaseController {
    constructor({ ctx = {
        state: {
            userInfo: {}
        }
    }, next }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.url = "/admin/p/ras"
    }
    async list_one() {
        try {
            const publicKey = getPublicKey()
            this.ctx.body = super.success({ data: {publicKey:publicKey.toString()} })
        } catch (error) {
            this.ctx.body = super.fail({ msg: `查询异常:${error.stack}` })
        }
    }

}

module.exports = PublicRasController;
