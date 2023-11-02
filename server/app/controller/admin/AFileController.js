const BaseController = require('../BaseController');
const path = require('path')
const fs = require('fs-extra')
const JSZip = require('jszip');
const rootPath = process.cwd()
const { modelSchemas } = require("../../utils/ModelSchemas");
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))


//读取目录及文件
function readDir(obj, nowPath, fatherPath) {
    let files = fs.readdirSync(nowPath);//读取目录中的所有文件及文件夹（同步操作）
    files.forEach(function (fileName, index) {//遍历检测目录中的文件
        let fillPath = nowPath + "/" + fileName;
        let file = fs.statSync(fillPath);//获取一个文件的属性
        if (file.isDirectory()) {//如果是目录的话，继续查询
            let dirlist = obj.folder(fileName);//压缩对象中生成该目录
            // logger.info(" readDir", fileName)
            readDir(dirlist, fillPath + '/', fileName);//重新检索目录文件
        } else {
            if (fileName.split(".")[1] != 'zip') {
                obj.file(`${fatherPath}-${index}.${fileName.split(".")[1]}`, fs.readFileSync(fillPath));//压缩目录添加文件
            }
        }
    });
}

async function startZIP(targetDir, filePath, path) {
    let zip = new JSZip();
    readDir(zip, targetDir, path);
    zip.generateAsync({//设置压缩格式，开始打包
        type: "nodebuffer",//nodejs用
        compression: "DEFLATE",//压缩算法
        compressionOptions: {//压缩级别
            level: 9
        }
    }).then(content => {
        if (fs.existsSync(filePath)) {
            fs.removeSync(filePath)
        }
        fs.writeFileSync(filePath, content, "utf-8");
    })
}

class FileController extends BaseController {
    constructor({ ctx = {
        state: {
            userInfo: {}
        }
    }, next }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.userInfo = this.ctx.state.userInfo;
        this.url = "/admin/file"
    }
    // 接口字段：file
    // 上传文件
    async create() {
        let {
            body,
            files
        } = this.ctx.request
        // const fileName = files.file.path + `-${files.file.name}`
        // if (fs.existsSync(files.file.path)) {
        //     await fs.move(files.file.path, fileName)
        // }
        this.ctx.body = super.success({
            data: files.file.path
        })
    }
    async create_goods() {
        let {
            body,
            files
        } = this.ctx.request
        const { _id } = body
        const goodsInfo = await modelSchemas.model100004.findOne({ _id: _id }) // 查询所有数据
        const fileName = `${(new Date()).getTime()}-${files.file.name}`
        const goodsPath = `${goodsInfo._doc.projectInfo}/${goodsInfo._doc.projectInfo}/${goodsInfo._doc.spu}/${goodsInfo._doc.sku}/`
        const targetDir = path.join(rootPath, `../assets/${goodsPath}`, fileName);
        if (fs.existsSync(files.file.path)) {
            await fs.move(files.file.path, targetDir)
        }
        this.ctx.body = super.success({
            data: { url: `https://stp1.cn:8180/resources/${goodsPath}${fileName}`, name: fileName }
        })
    }
    async get_zip() {
        let {
            _id,
            projectInfo,
            zipType,
        } = this.ctx.request.body
        if (zipType === 'zip') {
            const project = await modelSchemas.model100003.findOne({ _id: projectInfo })
            let goodsPath = `${projectInfo}/${projectInfo}`
            const targetDir = path.join(rootPath, `../assets/${goodsPath}`);
            const filePath = path.join(rootPath, `../assets/${projectInfo}/${project.name}.zip`);
            // logger.info(0, targetDir, filePath)
            await startZIP(targetDir, filePath)
            this.ctx.body = super.success({
                data: { url: `https://stp1.cn:8180/resources/${projectInfo}/${project.name}.zip` }
            })
        }
        if (zipType === 'zip-spu') {
            const goodsInfo = await modelSchemas.model100004.findOne({ _id: _id })
            let goodsPath = `${goodsInfo._doc.projectInfo}/${goodsInfo._doc.projectInfo}`
            const targetDir = path.join(rootPath, `../assets/${goodsPath}/${goodsInfo._doc.spu}`);
            const filePath = path.join(rootPath, `../assets/${goodsInfo._doc.projectInfo}/${goodsInfo._doc.projectInfo}-${goodsInfo._doc.spu}.zip`);
            // logger.info(1, targetDir, filePath)
            await startZIP(targetDir, filePath, goodsInfo._doc.spu)
            this.ctx.body = super.success({
                data: { url: `https://stp1.cn:8180/resources/${goodsInfo._doc.projectInfo}/${goodsInfo._doc.projectInfo}-${goodsInfo._doc.spu}.zip` }
            })
        }
        if (zipType === 'zip-sku') {
            const goodsInfo = await modelSchemas.model100004.findOne({ _id: _id })
            let goodsPath = `${goodsInfo._doc.projectInfo}/${goodsInfo._doc.projectInfo}`
            const targetDir = path.join(rootPath, `../assets/${goodsPath}/${goodsInfo._doc.spu}/${goodsInfo._doc.sku}`);
            const filePath = path.join(rootPath, `../assets/${goodsInfo._doc.projectInfo}/${goodsInfo._doc.projectInfo}-${goodsInfo._doc.sku}.zip`);
            // logger.info(2, targetDir, filePath)
            await startZIP(targetDir, filePath, goodsInfo._doc.sku)
            this.ctx.body = super.success({
                data: { url: `https://stp1.cn:8180/resources/${goodsInfo._doc.projectInfo}/${goodsInfo._doc.projectInfo}-${goodsInfo._doc.sku}.zip` }
            })
        }

    }
    async remove() {
        const { url } = this.ctx.request.body
        const targetDir = path.join(rootPath, `../assets/`);
        const filePath = url.replace('https://stp1.cn:8180/resources/', targetDir)
        if (fs.existsSync(filePath)) {
            fs.removeSync(filePath)
        }
        this.ctx.body = super.success({
            data: {}
        })
    }
    async get_file_path() {
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