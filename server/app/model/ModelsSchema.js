const mongoose = require('mongoose')
module.exports = mongoose.model('model', mongoose.Schema({
    id: Number,
    "func": String,
    "name": String,
    "state": {
        type: Number,
        default: 1
    },
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
    remark: String
}, {
    autoCreate: true
}), 'model')