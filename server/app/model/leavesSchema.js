const mongoose = require('mongoose')
const leavesSchema = mongoose.Schema({
    id: Number,
    orderNo: String,
    applyType: Number,
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    applyUser: {
        userId: String,
        userName: String,
        userEmail: String
    },
    leaveTime: String,
    reasons: String,
    auditUsers: String,
    curAuditUserName: String,
    auditFlows: [
        {
            userId: String,
            userName: String,
            userEmail: String
        }
    ],
    auditLogs: [
        {
            userId: String,
            userName: String,
            createTime: Date,
            remark: String,
            action: String
        }
    ],
    applyState: { type: Number, default: 1 },
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

module.exports = mongoose.model("leaves",leavesSchema,"leaves")