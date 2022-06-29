const mongoose = require('mongoose')
const dictSchema = mongoose.Schema({
    "id": Number,
    "name": String,//名称
    "nameCode": {
        type: String,
        unique: true
    },//字典类型
    "state": {
        type: Number,
        default: 1
    },// 1:正常  2：停用 
    "createTime": {
        type: Date,
        default: Date.now()
    },//创建时间
    "lastLoginTime": {
        type: Date,
        default: Date.now()
    },//更新时间
    remark: String
}, { autoIndex: true, autoCreate: true })
module.exports = mongoose.model("dict", dictSchema, "dict")