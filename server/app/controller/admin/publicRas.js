// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../base_controller.js');
const Schema = require('./../../model')
const log4js = require('./../../log4js/log')
const { encode } = require('./../../utils/tools')
const { getPublicKey } = require("./../../utils/tools_rsa")
const ExceptionCode = require('../../exception/code');


class publicRasController extends BaseController {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.userInfo = ctx.state.userInfo;
    }
    async get() {
        try {
            const publicKey = getPublicKey() //查询所有数据
            // console.log("publicKey",publicKey.toString())
            this.ctx.body = super.success({ data: {publicKey:publicKey.toString()} })
        } catch (error) {
            this.ctx.body = super.fail({ msg: `查询异常:${error.stack}` })
        }
    }

}

module.exports = publicRasController;
