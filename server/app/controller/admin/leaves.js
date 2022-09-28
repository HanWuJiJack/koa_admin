// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../base_controller.js');
const Schema = require('./../../model')
const log4js = require('./../../log4js/log')
const { encode } = require('./../../utils/tools')
const ExceptionCode = require('../../exception/code');


class UserAdminController extends BaseController {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.userInfo = ctx.state.userInfo;
    }

    async list() {
        try {
            const { applyState, type } = this.ctx.request.query;
            const { page, skipIndex } = super.pager(this.ctx.request.query)
            const userInfo = this.userInfo
            let params = {}
            if (type === 'approve') { // 待审核列表
                if (applyState == null || Number(applyState) === 0 || applyState === '') { // 全部
                    params = {
                        "auditFlows.userId": userInfo.userId
                    }
                } else if (Number(applyState) === 1 || Number(applyState) === 2) { // 待审核状态-审核中
                    params = {
                        "auditFlows.userId": userInfo.userId,
                        $or: [{ applyState: 1 }, { applyState: 2 }]
                    }
                    params.curAuditUserName = userInfo.userName
                } else { // 其他状态
                    params = {
                        "auditFlows.userId": userInfo.userId,
                        applyState
                    }
                }
            } else { // 申请休假列表
                params = {
                    "applyUser.userId": userInfo.userId
                }
                if (applyState != null && Number(applyState)) params.applyState = applyState;
            }
            // 根据条件查询所有用户列表
            const query = Schema.leavesSchema.find(params)//查询所有数据
            const list = await query.skip(skipIndex).limit(page.pageSize)//根据查出的所有数据截取对应页数的数据
            const total = await Schema.leavesSchema.countDocuments(params);
            this.ctx.body = super.success({
                data: {
                    page: {
                        ...page,
                        total
                    },
                    list
                }
            })
        } catch (error) {
            this.ctx.body = super.fail({ msg: `查询异常:${error.stack}` })
        }
    }

    async create() {
        const { _id, action, ...params } = this.ctx.request.body;
        try {
            let res, info;
            const userInfo = this.userInfo
            if (action == 'create') {
                // 获取申请人所属部门
                let applyPeoPledept = userInfo.deptId.pop()
                console.log("applyPeoPledept", applyPeoPledept)
                // 根据部门查找到部门负责人
                const deptData = await Schema.deptSchema.findById(applyPeoPledept)
                // 当前审批人
                params.curAuditUserName = deptData.userName
                // 生成申请单号
                let orderNo = 'XS' + super.formateDate(new Date(), 'yyyyMMdd')
                let count = await Schema.leavesSchema.countDocuments()
                orderNo += count
                params.orderNo = orderNo
                // 申请人信息数据
                params.applyUser = {
                    userId: userInfo.userId,
                    userName: userInfo.userName,
                    userEmail: userInfo.userEmail
                }
                // 完整审核人名字
                params.auditUsers = deptData.userName
                // 审批流数据
                const finance = await Schema.deptSchema.find({ deptName: { $in: ['人事部门', '财务部门'] } })
                params.auditFlows = [
                    { userId: deptData.userId, userName: deptData.userName, userEmail: deptData.userEmail }
                ]
                finance.map(item => {
                    params.auditFlows.push({
                        userId: item.userId,
                        userName: item.userName,
                        userEmail: item.userEmail
                    })
                    params.auditUsers += ',' + item.userName
                })
                // 审批日志
                params.auditLogs = []
                res = await Schema.leavesSchema.create(params)
                info = '创建成功'
            } else if (action === 'delete') {
                const res = await Schema.leavesSchema.findByIdAndUpdate(_id, { applyState: 5 })
                info = '作废成功'
            }
            this.ctx.body = super.success({ msg: info });
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack });
        }
    }
    async approve() {
        const { _id, action, remark } = this.ctx.request.body;
        const userInfo = this.userInfo
        try {
            const doc = await Schema.leavesSchema.findById(_id)
            // console.log("doc", doc)
            if (action === 'refuse') {
                const auditLogs = doc.auditLogs
                auditLogs.push({
                    userId: userInfo.userId,
                    userName: userInfo.userName,
                    createTime: new Date(),
                    remark,
                    action: '驳回'
                })
                await Schema.leavesSchema.findByIdAndUpdate(_id, { applyState: 3, auditLogs })
            } else {
                if (doc.auditLogs.length === doc.auditFlows.length) { // 证明已经审核完了
                    ctx.body = super.success({msg:'此单子已审核完成，无需再次审核！'})
                    return
                } else if (doc.auditLogs.length > 1) { // 审核中状态

                    const auditLogs = doc.auditLogs
                    auditLogs.push({
                        userId: userInfo.userId,
                        userName: userInfo.userName,
                        createTime: new Date(),
                        remark,
                        action: '通过'
                    })
                    await Schema.leavesSchema.findByIdAndUpdate(_id, { applyState: 4, auditLogs })
                } else if (doc.auditLogs.length === doc.auditFlows.length - 1) {
                    const auditLogs = doc.auditLogs
                    auditLogs.push({
                        userId: userInfo.userId,
                        userName: userInfo.userName,
                        createTime: new Date(),
                        remark,
                        action: '通过'
                    })
                    // console.log(777,auditLogs)
                    const curAuditUserName = auditLogs[auditLogs.length - 1].userName
                    await Schema.leavesSchema.findByIdAndUpdate(_id, { applyState: 2, auditLogs, curAuditUserName })
                }
            }
            this.ctx.body = super.success({ msg: "处理成功" });
        } catch (error) {
            this.ctx.body = super.fail({ msg: `审核失败=>${error.stack}` });
        }
    }
    async count() {
        const userInfo = this.userInfo
        let params = {}
        try {
            params = {
                "auditFlows.userId": userInfo.userId,
                $or: [{ applyState: 1 }, { applyState: 2 }]
            }
            params.curAuditUserName = userInfo.userName
            const total = await Schema.leavesSchema.countDocuments(params)
            this.ctx.body = super.success({ data: total, msg: '查询成功' })
        } catch (error) {
            console.log(error)
            this.ctx.body = super.fail({ msg: `查询异常:${error.message}` })
        }
    }
}

module.exports = UserAdminController;
