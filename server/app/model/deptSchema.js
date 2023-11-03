const mongoose = require('mongoose')
const deptSchema = mongoose.Schema({
    id: Number,
    "state": {
        type: Number,
        default: 1
    },
    deptName: String,
    userId: String,
    userName: String,
    userEmail: String,
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

module.exports = mongoose.model("depts",deptSchema,"depts")