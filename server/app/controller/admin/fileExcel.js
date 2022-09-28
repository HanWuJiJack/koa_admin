const BaseController = require('../base_controller.js');
const path = require('path')
const ExceptionCode = require('../../exception/code');
const fs = require('fs-extra')
var xlsx = require('node-xlsx');
const { modelSchemas } = require("./../../utils/modelSchemas");
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
        const { projectInfo, company } = body
        // console.log(projectInfo, company, files)
        // modelSchemas.model100004.
        const fileName = files.file.path + `-${files.file.name}`
        if (fs.existsSync(files.file.path)) {
            await fs.move(files.file.path, fileName)
        }
        var sheets = xlsx.parse(fileName);
        let rows = []
        sheets.forEach(function (sheet) {
            // 读取每行内容
            for (var rowId in sheet['data']) {
                if (rowId > 4) {
                    rows.push({
                        sly: sheet['data'][rowId][0],
                        code: sheet['data'][rowId][1],
                        spu: sheet['data'][rowId][2],
                        sku: sheet['data'][rowId][3],
                        color: sheet['data'][rowId][4],
                        NumColor: sheet['data'][rowId][5],
                        type: sheet['data'][rowId][6],
                        mainColor: sheet['data'][rowId][7],
                        isModel: sheet['data'][rowId][10] ? sheet['data'][rowId][10].toString() : '0',
                        isVideo: sheet['data'][rowId][11] ? sheet['data'][rowId][11].toString() : '0',
                        isPicture: sheet['data'][rowId][12] ? sheet['data'][rowId][12].toString() : '0',
                        isTag: sheet['data'][rowId][13] ? sheet['data'][rowId][13].toString() : '0',
                        company: company,
                        projectInfo: projectInfo,
                        isAccept:"2"
                    });
                }
            }
        });
        await modelSchemas.model100004.insertMany(rows)
        this.ctx.body = super.success({
            data: { rows }
        })
    }
}

module.exports = FileController;