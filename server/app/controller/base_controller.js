
const jwt = require('jsonwebtoken')

class BaseController {
    constructor() {

    }
    success({ data, msg }) {
        return {
            'status': 'ok',
            'code': 200,
            'data': null,
            'message': msg || 'success',
            data
        }
    }

    fail({ data, msg }) {
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
    pager({ pageNum = 1, pageSize = 10 }) {
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
                result.push(rootList[i]._doc)
            }
        }
        // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加
        result.map(item => {
            item.children = this.TreeMenu(rootList, item._id)
            if (item.children.length === 0) {
                delete item.children
            } else if (item.children.length > 0 && item.children[0].menuType === 2) {
                item.btnList = item.children
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

}

module.exports = BaseController;
