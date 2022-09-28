const mongoose = require('mongoose')
const dictTypeSchema = mongoose.Schema({
    id: Number,
    "dictId": Number,//用户ID，自增长
    "dictLabel": String,//字典标签
    "dictValue": String,//字典键值
    "dictSort": Number,
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
module.exports = mongoose.model("dictType", dictTypeSchema, "dictType")