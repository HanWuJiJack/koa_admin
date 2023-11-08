import request from '@/utils/request'

//获取菜单列表
export function postMenuList(data) {
    return request({
        url: 'auth/admin/menu/list',
        method: 'get',
        params: data
    })
}
//新建/修改/删除菜单
export function postMenu(data) {
    return request({
        url: 'auth/admin/menu',
        method: 'post',
        data: data
    })
}

export function putMenu(data) {
    return request({
        url: 'auth/admin/menu/' + data.id,
        method: 'put',
        data: data
    })
}

export function deleteMenu(data) {
    return request({
        url: 'auth/admin/menu/' + data.id,
        method: 'delete',
        data: data
    })
}
//获取用户列表
export function getPermissonMenuList(query) {
    return request({
        url: '/auth/admin/menu/list_permisson_menu',
        method: 'get',
        params: query
    })
}