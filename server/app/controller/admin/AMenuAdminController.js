const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const path = require("path")
const redis = require(path.join(process.cwd(), "./config/Redis"))
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))
const AutoID = require('./../../utils/AutoID')

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
        const userInfo = this.userInfo
        try {
            const {
                menuName,
                state = 1
            } = this.ctx.request.query;
            const params = {}
            if (menuName) params.menuName = menuName;
            params.state = parseInt(state);
            var rootList
            if (userInfo.role === 0) { // 0是超级管理员
                rootList = await Schema.menusSchema.find(params) || []
            } else { // 1普通用户
                // 先根据用户的角色列表字段查出对应角色数据
                var roleData = await Schema.rolesSchema.find({
                    id: {
                        $in: userInfo.roleList
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
                    id: {
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
            id,
            action,
            ...params
        } = this.ctx.request.body;
        let res, info;
        try {
            if (action == 'create') {
                const currentIndex = await AutoID({
                    code: "menuId"
                })
                params.id = currentIndex
                params.createByUser = this.ctx.state.userId.id
                res = await Schema.menusSchema.create(params)
                info = '创建成功'
            } else if (action == 'edit') {
                params.updateTime = new Date();
                params.updateByUser = this.ctx.state.userId.id
                // res = await Schema.menusSchema.findByIdAndUpdate(id, params);
                res = await Schema.menusSchema.findOneAndUpdate({id}, params);
                info = '编辑成功'
            } else {

                const menusInfo = await Schema.menusSchema.findOne({
                    parentId: {
                        $all: [id]
                    }
                })
                if (menusInfo) {
                    this.ctx.body = super.fail({
                        msg: "请先将子集删除！"
                    });
                    return
                }
                // res = await Schema.deptSchema.findByIdAndRemove(id)
                res = await Schema.menusSchema.findOneAndUpdate({id}, {
                    state: 2
                });
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
        await redis.setHashMap(String(userInfo.id), {
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