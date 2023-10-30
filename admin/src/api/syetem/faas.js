import request from '@/utils/request'


//获取详情
export function getFaas(id) {
    return request({
        url: `auth/admin/faas/get/${id}`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getFaasList(query) {
    return request({
        url: 'auth/admin/faas/list',
        method: 'get',
        params: query
    })
}
//新建
export function addFaas(data) {
    return request({
        url: 'auth/admin/faas/create',
        method: 'post',
        data: data
    })
}

//编辑
export function updataFaas(data) {
    return request({
        url: `auth/admin/faas/update/${data._id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeFaas(ids) {
    return request({
        url: `auth/admin/faas/remove/${ids}`,
        method: 'delete',
    })
}
