const mongoose = require('mongoose')
const faasSchema = mongoose.Schema({
    "method": String, //函数类型
    "fn": String, //函数
    "path": String, //函数
    "isAuth": String, //
    "code": {
        type: String,
        unique: false
    }, //字典类型
    schemaCode: String,
    "state": {
        type: Number,
        default: 1
    }, // 1:正常  2：停用 
    "createTime": {
        type: Date,
        default: Date.now()
    }, //创建时间
    "lastLoginTime": {
        type: Date,
        default: Date.now()
    }, //更新时间
    remark: String
}, {
    autoIndex: true,
    autoCreate: true
})
module.exports = mongoose.model("faas", faasSchema, "faas")