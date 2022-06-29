const BaseController = require('../base_controller.js');
const path = require('path')
const ExceptionCode = require('../../exception/code');
const fs = require('fs-extra')
var xlsx = require('node-xlsx');
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
        var sheets = xlsx.parse(fileName);
        sheets.forEach(function(sheet){
            console.log(sheet['name']);
            // 读取每行内容
            for(var rowId in sheet['data']){
                console.log(rowId);
                var row=sheet['data'][rowId];
                console.log(row);
            }
        });
        this.ctx.body = super.success({
            data: {}
        })
    }
}

module.exports = FileController;