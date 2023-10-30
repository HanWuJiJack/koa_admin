const Schema = require('../model/Model');
const vm2 = require("../utils/VM");
const {
    modelSchemas
} = require('../utils/ModelSchemas');
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
exports.initFaas = async () => {
    let models = []
    let dictInfo = await Schema.dictSchema.findOne({
        nameCode: "Schema_type"
    })
    const query = await Schema.dictTypeSchema.find({
        dictId: dictInfo.id
    })
    for (const iterator of query) {
        models.push(iterator.dictLabel)
    }
    for (const key in models) {
        if (Object.hasOwnProperty.call(models, key)) {
            await vm2({}, {}, models[key])()
        }
    }
    logger.httplog.info(`modelSchemas:`, modelSchemas)
}