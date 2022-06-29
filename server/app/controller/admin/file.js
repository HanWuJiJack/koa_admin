// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../base_controller.js');
const path = require('path')
const ExceptionCode = require('../../exception/code');
const fs = require('fs-extra')

class FileController extends BaseController {
    constructor(ctx, next) {
        super();
        this.ctx = ctx;
        this.next = next
        this.userInfo = ctx.state.user;
    }

    async upload() {
        let {
            body,
            files
        } = this.ctx.request
        const fileName = files.file.path + `-${files.file.name}`
        if (fs.existsSync(files.file.path)) {
            await fs.move(files.file.path, fileName)
        }

        this.ctx.body = super.success({
            data: filesINfo
        })
    }
}

module.exports = FileController;