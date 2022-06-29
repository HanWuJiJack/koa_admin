import request from '@/utils/request'

//获取角色名称列表
export function getRolesNameList(query){
    return request({
        url: 'api/roles/operate',
        method: 'get',
        params: query
    })
}
// 获取角色列表数据
export function getRolesList(query){
    return request({
        url: 'api/roles/list',
        method: 'get',
        params: query
    })
}
// 角色创建/编辑/删除
export function postRolesC_U_D(data){
    return request({
        url: 'api/roles/operate',
        method: 'post',
        data: data
    })
}

// 设置角色权限
export function postUpdatePermission(data){
    return request({
        url: 'api/roles/update/permission',
        method: 'post',
        data: data
    })
}
