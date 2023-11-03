const jwt = require('jsonwebtoken')
const Schema = require('./../model/Model')
class BaseController {
    constructor() {

    }
    success({
        data,
        msg
    }) {
        return {
            'status': 'ok',
            'code': 200,
            'data': null,
            'message': msg || 'success',
            data
        }
    }

    fail({
        data,
        msg
    }) {
        return {
            'status': 'error',
            'code': 403,
            'data': null,
            'message': msg || 'fail',
            data
        }
    }
    /**
     * 分页结构封装
     * @param {number} pageNum 
     * @param {number} pageSize 
     */
    pager({
        pageNum = 1,
        pageSize = 10
    }) {
        pageNum *= 1;
        pageSize *= 1;
        const skipIndex = (pageNum - 1) * pageSize;
        return {
            page: {
                pageNum,
                pageSize
            },
            skipIndex
        }
    }

    // 解码token
    decodeToken(token) {
        if (token) {
            return jwt.verify(token, process.env.APP_KEY);
        }
        return ''
    }
    // 递归生成菜单
    TreeMenu(rootList, id) {
        var result = []
        for (var i = 0; i < rootList.length; i++) {
            // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
            // 所以给他来个强制转换成字符串，才能正常对比他是否相等
            if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id)) {
                result.push({
                    ...rootList[i]._doc
                })
            }
        }
        // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加
        result.map(item => {
            item.children = this.TreeMenu(rootList, item.id)
            if (item.children.length === 0) {
                delete item.children
            }
        })
        return result
    }
    // 递归生成菜单
    TreeMenuShow(rootList, id) {
        var result = []
        for (var i = 0; i < rootList.length; i++) {
            // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
            // 所以给他来个强制转换成字符串，才能正常对比他是否相等
            // 过滤条件 isShow = 1  menuType != 3
            if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id) && rootList[i]._doc.isShow == 1 && rootList[i]._doc.menuType != 3) {
                result.push({
                    ...rootList[i]._doc
                })
            }
        }
        // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加
        result.map(item => {
            item.children = this.TreeMenuShow(rootList, item.id)
            if (item.children.length === 0) {
                delete item.children
            }
        })
        return result
    }
    // 时间格式化
    formateDate(date, format) {
        let fmt = format || 'yyyy-MM-dd hh:mm:ss'
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, date.getFullYear())
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const val = o[k] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
            }
        }
        return fmt;
    }

    async list_menu(role, roleList) {
        var rootList
        if (role === 0) { // 0是超级管理员
            rootList = await Schema.menusSchema.find({
                state: 1, //状态值：正常 | 停用
            }) || []
        } else { // 1普通用户
            // 先根据用户的角色列表字段查出对应角色数据
            var roleData = await Schema.rolesSchema.find({
                id: {
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
                id: {
                    $in: resultPermissonList
                },
                state: 1, //状态值：正常 | 停用
            }) || []
        }
        const btnList = rootList.map(item => item.menuCode).filter(item => item)
        const codeList = rootList.map(item => item.code).filter(item => item)
        const routeList = rootList.filter(item => item.menuType == 2)
        // isShow 显示|隐藏 过滤掉隐藏
        const menuList = this.TreeMenuShow(rootList, null)
        return {
            btnList,
            routeList,
            menuList,
            codeList
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
    TreeDept(rootList, id) {
        var result = []
        for (var i = 0; i < rootList.length; i++) {
            // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
            // 所以给他来个强制转换成字符串，才能正常对比他是否相等
            if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id)) {
                result.push(rootList[i]._doc)
            }
        }
        // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加
        result.map(item => {
            item.children = this.TreeDept(rootList, item.id)
            if (item.children.length === 0) {
                delete item.children
            }
        })
        return result
    }
    // async list(){}
    // async list_all(){}

    // async get(){}

    // async create(){}
    // async update(){}
    // async remove(){}

}

module.exports = BaseController;