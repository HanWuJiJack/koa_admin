import request from '@/utils/request'

//获取菜单列表
export function postMenuList(data) {
    return request({
        url: '/auth/admin/menu/list',
        method: 'get',
        params: data
    })
}
//新建/修改/删除菜单
export function postMenuC_U_D(data) {
    return request({
        url: 'auth/admin/menu/create',
        method: 'post',
        data: data
    })
}
//获取用户列表
export function getPermissonMenuList(query) {
    return request({
        url: 'auth/admin/menu/list_permisson_menu',
        method: 'get',
        params: query
    })
}