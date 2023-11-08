import request from '@/utils/request'
//获取角色名称列表
export function getRolesNameList(query) {
    return request({
        url: 'auth/admin/roles/list_all',
        method: 'get',
        params: query
    })
}
// 获取角色列表数据
export function getRolesList(query) {
    return request({
        url: 'auth/admin/roles/list',
        method: 'get',
        params: query
    })
}
// 角色创建/编辑/删除
export function postRoles(data) {
    return request({
        url: 'auth/admin/roles',
        method: 'post',
        data: data
    })
}

export function putRoles(data) {
    return request({
        url: 'auth/admin/roles',
        method: 'put',
        data: data
    })
}

export function deleteRoles(data) {
    return request({
        url: 'auth/admin/roles',
        method: 'delete',
        data: data
    })
}

// 设置角色权限
export function postUpdatePermission(data) {
    return request({
        url: 'auth/admin/roles/permission',
        method: 'put',
        data: data
    })
}