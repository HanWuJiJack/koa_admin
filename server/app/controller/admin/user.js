// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../base_controller.js');
const Schema = require('./../../model')
const log4js = require('./../../log4js/log')
const { encode, hash } = require('./../../utils/tools')
const ExceptionCode = require('../../exception/code');


class UserAdminController extends BaseController {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.userInfo = ctx.state.userInfo;
    }

    async list() {
        const {
            userId,
            userName,
            state
        } = this.ctx.request.query;
        const {
            page,
            skipIndex
        } = super.pager(this.ctx.request.query)
        let params = {}
        if (userId) params.userId = userId;
        if (userName) params.userName = userName;
        if (state && state != '0') params.state = parseInt(state);
        try {
            // 根据条件查询所有用户列表
            const query = Schema.usersSchema.find(params) //查询所有数据
            const list = await query.skip(skipIndex).limit(page.pageSize) //根据查出的所有数据截取对应页数的数据
            const total = await Schema.usersSchema.countDocuments(params);
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
            this.ctx.body = super.fail({ data: {}, msg: `查询异常:${error.stack}` })
        }
    }

    async create() {
        const {
            userId,
            userName,
            userEmail,
            mobile,
            job,
            state,
            roleList,
            deptId,
            action,
            brand,
            company,
            companyAddress,
            InvoiceTitle,
            dutyParagraph,
            expressAddress,
            expressName,
            expressPhone,
        } = this.ctx.request.body;
        if (action === 'add') {
            this.ctx.verifyParams({
                userName: 'string',
                userEmail: 'string',
                deptId: "array"
            })
            //先查一下是否数据库里已经存在
            const repeat = await Schema.usersSchema.findOne({
                // $or: [{
                //     userName
                // }, {
                //     userEmail
                // }]
                $or: [{
                    userEmail
                }]
            }, '_id userName userEmail');

            if (repeat) {
                this.ctx.body = super.fail({ msg: `您新增的用户:邮箱:${repeat.userEmail}已经存在~` })
                return;
            } else {
                try {
                    const countDoc = await Schema.counterSchema.findOneAndUpdate({
                        _id: 'userId'
                    }, {
                        $inc: {
                            currentIndex: 1
                        }
                    }, {
                        new: true
                    });
                    const addUser = new Schema.usersSchema({
                        userId: countDoc.currentIndex,
                        userName,
                        userPwd: hash('123456'),
                        userEmail,
                        role: 1, //1:默认普通用户 0是超级管理员
                        roleList,
                        job,
                        state,
                        deptId,
                        mobile,
                        brand,
                        company,
                        companyAddress,
                        InvoiceTitle,
                        dutyParagraph,
                        expressAddress,
                        expressName,
                        expressPhone,
                    });
                    await addUser.save();
                    this.ctx.body = super.success({}, '添加用户成功')
                } catch (error) {
                    this.ctx.body = super.fail('添加用户失败，请联系管理员' + error.stack)
                }
            }
        } else {
            //检测有没有选择部门
            if (!deptId) {
                this.ctx.body = super.fail({ msg: '部门不能为空' })
                return;
            }
            try {
                await Schema.usersSchema.findOneAndUpdate({
                    userId
                }, {
                    mobile,
                    job,
                    state,
                    roleList,
                    deptId,
                    userName,
                    // userPwd: hash(userPwd),
                    brand,
                    company,
                    companyAddress,
                    InvoiceTitle,
                    dutyParagraph,
                    expressAddress,
                    expressName,
                    expressPhone,
                }, { new: true });
                this.ctx.body = super.success({ msg: '更新用户数据成功' });
            } catch (error) {
                console.log(error)
                this.ctx.body = super.fail({ msg: '更新用户数据失败' });
            }
        }
    }

    async remove() {
        const {
            userIds
        } = this.ctx.request.body;
        let res = await Schema.usersSchema.updateMany({
            userId: {
                $in: userIds
            }
        }, {
            state: 2
        });
        if (res.nModified) {
            this.ctx.body = super.success({ data: res, msg: `共删除成功${res.nModified}条` })
            return;
        }
        this.ctx.body = super.fail({ msg: '删除失败' });
    }
    async all() {
        try {
            const list = await Schema.usersSchema.find({}) //查询所有数据
            this.ctx.body = super.success({ data: list })
        } catch (error) {
            this.ctx.body = super.fail({ msg: `查询异常:${error.stack}` })
        }
    }
    async login() {
        this.ctx.verifyParams({
            userEmail: 'string',
            userPwd: 'string',
        })
        try {
            const {
                userEmail,
                userPwd
            } = this.ctx.request.body;
            // const list = await Schema.usersSchema.find({}) //查询所有数据
            // console.log("list7777")
            const res = await Schema.usersSchema.findOne({
                userEmail,
                userPwd: hash(userPwd),
                // state: 1,
            });
            // console.log("res", res)
            if (res) {
                var token = encode(res._doc.userId)
                var data = res._doc;
                data.token = token;
                this.ctx.body = super.success({ data: data, msg: '登陆成功！' });
            } else {
                this.ctx.body = super.fail({ data: {}, msg: '账号被禁用、账号或密码错误！' });
            }
        } catch (error) {
            console.log(error)
            log4js.log(error.msg, "e");
        }
    }

    async getUserInfo() {
        this.ctx.body = super.success({ data: this.userInfo })
    }

    async changePWS() {
        const {
            userPwd,
            userId
        } = this.ctx.request.body;
        try {
            await Schema.usersSchema.findOneAndUpdate({
                userId
            }, {
                userPwd: hash(userPwd),
            }, { new: true });
            this.ctx.body = super.success({ msg: '更新用户数据成功' });
        } catch (error) {
            console.log(error)
            this.ctx.body = super.fail({ msg: '更新用户数据失败' });
        }
    }
}

module.exports = UserAdminController;
