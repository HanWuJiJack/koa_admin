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
            const { menuName, menuState } = this.ctx.request.body;
            const params = {}
            if (menuName) params.menuName = menuName;
            if (menuState) params.menuState = parseInt(menuState);
            let rootList = await Schema.menusSchema.find(params) || []
            // console.log("rootList", rootList)
            const permissionList = super.TreeMenu(rootList, null)
            this.ctx.body = super.success({ data: permissionList });
        } catch (error) {
            console.log(77777, error)
        }

    }

    async create() {
        const { _id, action, ...params } = this.ctx.request.body;
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
                await Schema.menusSchema.deleteMany({ parentId: { $all: [_id] } })
                info = '删除成功'
            }
            this.ctx.body = super.success({ msg: info });
        } catch (error) {
            this.ctx.body = super.fail({ msg: error.stack });
        }
    }
    async getPermissonMenuList() {
        const ueserInfo = this.userInfo
        const menuList = await this.getMenuList(ueserInfo.role, ueserInfo.roleList)
        const btnList = this.getBtnPermissonList(menuList)
        this.ctx.body = super.success({ data: { menuList, btnList } })
    }
    async getMenuList(role, roleList) {
        var rootList
        if (role === 0) { // 0是超级管理员
            rootList = await Schema.menusSchema.find({}) || []
        } else { // 1普通用户
            // 先根据用户的角色列表字段查出对应角色数据
            var roleData = await Schema.rolesSchema.find({ _id: { $in: roleList } })
            // 然后根据取出来的角色，取出角色拥有的菜单数据，多角色出现相同的对他进行合并，也就是并集了【去重处理】~
            var resultPermissonList = []
            roleData.forEach(item => {
                resultPermissonList = resultPermissonList.concat([...item.permissionList.checkedKeys, ...item.permissionList.halfCheckedKeys])
            })
            resultPermissonList = [...new Set(resultPermissonList)] // 去重相同的菜单id
            rootList = await Schema.menusSchema.find({ _id: { $in: resultPermissonList } }) || []
        }
        return super.TreeMenu(rootList, null)
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

module.exports = UserAdminController;
