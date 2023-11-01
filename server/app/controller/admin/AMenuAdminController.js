// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const path = require("path")
const redis = require(path.join(process.cwd(), "./config/Redis"))
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))

class MenuAdminController extends BaseController {
    constructor({
        ctx = {
            state: {
                userInfo: {}
            }
        },
        next
    }) {
        super();
        this.ctx = ctx;
        this.next = next
        this.userInfo = this.ctx.state.userInfo;
        this.url = "/admin/menu"
    }

    async list() {
        const ueserInfo = this.userInfo
        try {
            const {
                menuName,
                menuState
            } = this.ctx.request.query;
            const params = {}
            if (menuName) params.menuName = menuName;
            if (menuState) params.menuState = parseInt(menuState);
            var rootList
            if (ueserInfo.role === 0) { // 0是超级管理员
                rootList = await Schema.menusSchema.find(params) || []
            } else { // 1普通用户
                // 先根据用户的角色列表字段查出对应角色数据
                var roleData = await Schema.rolesSchema.find({
                    _id: {
                        $in: ueserInfo.roleList
                    }
                })
                // 然后根据取出来的角色，取出角色拥有的菜单数据，多角色出现相同的对他进行合并，也就是并集了【去重处理】~
                var resultPermissonList = []
                roleData.forEach(item => {
                    resultPermissonList = resultPermissonList.concat([...item.permissionList.checkedKeys, ...item.permissionList.halfCheckedKeys])
                })
                resultPermissonList = [...new Set(resultPermissonList)] // 去重相同的菜单id
                rootList = await Schema.menusSchema.find({
                    ...params,
                    _id: {
                        $in: resultPermissonList
                    },
                }) || []
            }
            const permissionList = super.TreeMenu(rootList, null)
            this.ctx.body = super.success({
                data: permissionList
            });
        } catch (error) {
            logger.error(error)
        }
    }

    async create() {
        const {
            _id,
            action,
            ...params
        } = this.ctx.request.body;
        let res, info;
        try {
            if (action == 'create') {
                res = await Schema.menusSchema.create(params)
                info = '创建成功'
            } else if (action == 'edit') {
                params.updateTime = new Date();
                res = await Schema.menusSchema.findByIdAndUpdate(_id, params);
                info = '编辑成功'
            } else {
                res = await Schema.menusSchema.findByIdAndRemove(_id)
                await Schema.menusSchema.deleteMany({
                    parentId: {
                        $all: [_id]
                    }
                })
                info = '删除成功'
            }
            this.ctx.body = super.success({
                msg: info
            });
        } catch (error) {
            this.ctx.body = super.fail({
                msg: error.stack
            });
        }
    }
    async list_permisson_menu() {
        const userInfo = this.userInfo
        const {
            btnList,
            menuList,
            routeList,
        } = await super.list_menu(userInfo.role, userInfo.roleList)
        // logger.info("btnList", btnList)
        await redis.setHashMap(String(userInfo._id), {
            btnList
        })
        this.ctx.body = super.success({
            data: {
                menuList,
                btnList,
                routeList
            }
        })
    }
}

module.exports = MenuAdminController;