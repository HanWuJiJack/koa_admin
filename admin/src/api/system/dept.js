import request from '@/utils/request'

//获取部门列表
export function getDeptList(query) {
    return request({
        url: '/auth/admin/dept/list',
        method: 'get',
        params: query
    })

}
//新建/修改/删除部门
export function postDept(data) {
    return request({
        url: '/auth/admin/dept',
        method: 'post',
        data: data
    })
}
export function putDept(data) {
    return request({
        url: '/auth/admin/dept',
        method: 'put',
        data: data
    })
}
export function deleteDept(data) {
    return request({
        url: '/auth/admin/dept',
        method: 'delete',
        data: data
    })
}