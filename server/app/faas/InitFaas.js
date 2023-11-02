const vm2 = require("../utils/VM");
const {
    modelSchemas
} = require('../utils/ModelSchemas');
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const mongoose = require('mongoose');

module.exports = async function (){
    console.log(Object.keys(modelSchemas))
    // 先全部清理
    Object.keys(modelSchemas).map(item => {
        if (item != "modelSchema") {
            const name = item.slice(0, -6)
            mongoose.deleteModel(name);
            delete modelSchemas[item]
        }
    })
    // 在进行初始化
    let models = []
    const query = await modelSchemas.modelSchema.find({
        state: 1
    })
    for (const iterator of query) {
        models.push(iterator.func)
    }
    for (const key in models) {
        if (Object.hasOwnProperty.call(models, key)) {
            await vm2({}, {}, models[key])()
        }
    }
    console.log(Object.keys(modelSchemas))
}