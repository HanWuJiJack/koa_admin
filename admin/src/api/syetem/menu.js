import request from '@/utils/request'

//获取菜单列表
export function postMenuList(data) {
    return request({
        url: 'api/menu/list',
        method: 'post',
        data: data
    })
}
//新建/修改/删除菜单
export function postMenuC_U_D(data) {
    return request({
        url: 'api/menu/operate',
        method: 'post',
        data: data
    })
}
//获取用户列表
export function getPermissonMenuList(query) {
    return request({
        url: 'api/menu/getPermissonMenuList',
        method: 'get',
        params: query
    })
}