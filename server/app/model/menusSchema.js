const mongoose = require('mongoose')
const menusSchema = mongoose.Schema({
    id: Number,
    menuType: Number, //菜单类型
    menuName: String, //菜单名称
    menuCode: String, //权限标识
    path: String, //路由地址
    icon: String, //图标
    component: String, //组件地址
    code: String, //code
    "state": {
        type: Number,
        default: 1
    },// 1:正常  2：停用 
    isShow: {
        type: Number,
        default: Date.now()
    }, //菜单是否展示
    // parentId: [mongoose.Types.ObjectId],
    parentId: [Number],
    updateTime: {
        type: Date,
        default: Date.now()
    },
    updateByUser:Number,
    createTime: {
        type: Date,
        default: Date.now()
    },
    createByUser:Number,
}, { autoCreate: true })

module.exports = mongoose.model("menus", menusSchema, "menus")