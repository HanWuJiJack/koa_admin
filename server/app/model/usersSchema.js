const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    brand: String,//品牌
    "userName": String,//用户名称
    "job": String,//岗位
    "mobile": String,//手机号
    "userEmail": String,//用户邮箱
    company: String,//公司
    companyAddress: String,//公司地址
    InvoiceTitle: String,//发票抬头
    dutyParagraph: String,//税号
    expressAddress: String,//快递地址
    expressName: String,//快递联系人
    expressPhone: String,//快递联系人手机号
    "userId": Number,//用户ID，自增长
    "userPwd": String,//用户密码，hash加密
    "sex": Number,//性别 0:男  1：女 
    "deptId": [],//部门
    "state": {
        type: Number,
        default: 1
    },// 1: 启用 2: 禁用 
    "role": {
        type: Number,
        default: 1
    }, // 用户角色 0：系统管理员  1： 普通用户
    "roleList": [], //系统角色
    "createTime": {
        type: Date,
        default: Date.now()
    },//创建时间
    "lastLoginTime": {
        type: Date,
        default: Date.now()
    },//更新时间
    // 微信openid和session_key
    openid: String,
    session_key: String,
    remark: String
})

module.exports = mongoose.model("users", userSchema, "users")