const vm2 = require("../utils/VM");
const {
    modelSchemas
} = require('../utils/ModelSchemas');
const Schema = require('../model/Model')
const path = require("path")
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const mongoose = require('mongoose');
const _ = require("lodash")

module.exports = async function () {
    // console.log(Object.keys(modelSchemas))
    const len = Object.keys(modelSchemas).length
    const keys =  _.cloneDeep(Object.keys(modelSchemas))
    // 先全部清理
    for (let i = 0; i < len; i++) {
        let item = keys[i]
        const name = item.slice(0, -6)
        mongoose.deleteModel(name);
        delete modelSchemas[item]
    }
    // console.log(Object.keys(modelSchemas))
    // 在进行初始化
    let models = []
    const query = await Schema.ModelsSchema.find({
        state: 1
    })
    for (const iterator of query) {
        models.push(iterator.func)
    }
    for (const key in models) {
        if (Object.hasOwnProperty.call(models, key)) {
            await vm2({}, models[key])()
        }
    }
    // console.log(Object.keys(modelSchemas))
}