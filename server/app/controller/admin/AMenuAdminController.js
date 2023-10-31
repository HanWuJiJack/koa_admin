// const Controller = require('../../../../core/controller/admin.js');

const BaseController = require('../BaseController');
const Schema = require('./../../model/Model.js')
const path = require("path")
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
        const ueserInfo = this.userInfo
        const {
            btnList,
            menuList,
            routeList
        } = await this.list_menu(ueserInfo.role, ueserInfo.roleList)
        this.ctx.body = super.success({
            data: {
                menuList,
                btnList,
                routeList
            }
        })
    }
    async list_menu(role, roleList) {
        var rootList
        if (role === 0) { // 0是超级管理员
            rootList = await Schema.menusSchema.find({
                menuState: 1,//状态值：正常 | 停用
            }) || []
        } else { // 1普通用户
            // 先根据用户的角色列表字段查出对应角色数据
            var roleData = await Schema.rolesSchema.find({
                _id: {
                    $in: roleList
                }
            })
            // 然后根据取出来的角色，取出角色拥有的菜单数据，多角色出现相同的对他进行合并，也就是并集了【去重处理】~
            var resultPermissonList = []
            roleData.forEach(item => {
                resultPermissonList = resultPermissonList.concat([...item.permissionList.checkedKeys, ...item.permissionList.halfCheckedKeys])
            })
            resultPermissonList = [...new Set(resultPermissonList)] // 去重相同的菜单id
            rootList = await Schema.menusSchema.find({
                _id: {
                    $in: resultPermissonList
                },
                menuState: 1,//状态值：正常 | 停用
            }) || []
        }
        const btnList = rootList.map(item => item.menuCode).filter(item => item)
        const routeList = rootList.filter(item => item.menuType == 2)
        // isShow 显示|隐藏 过滤掉隐藏
        const menuList = super.TreeMenuShow(rootList, null)
        return {
            btnList,
            routeList,
            menuList,
        }
    }
    // 根据生成的权限菜单过滤出对应的按钮列表
    getBtnPermissonList(list) {
        var result = []
        for (var i = 0; i < list.length; i++) {
            if (list[i].btnList) { // 如果btnList存在 那就证明他是最后一个层级的父节点了
                list[i].btnList.forEach(item => {
                    result.push(item.menuCode)
                })
            } else if (list[i].children && !list[i].btnList) {
                result = result.concat(this.getBtnPermissonList(list[i].children))
            }
        }
        return result
    }
}

module.exports = MenuAdminController;