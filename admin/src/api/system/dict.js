import request from '@/utils/request'


//获取详情
export function getDict(id) {
    return request({
        url: `/auth/admin/dict/${id}`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getDictList(query) {
    return request({
        url: '/auth/admin/dict/list',
        method: 'get',
        params: query
    })
}
//新建
export function addDict(data) {
    return request({
        url: '/auth/admin/dict',
        method: 'post',
        data: data
    })
}

//编辑
export function updataDict(data) {
    return request({
        url: `/auth/admin/dict/${data.id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeDict(ids) {
    return request({
        url: `/auth/admin/dict/${ids}`,
        method: 'delete',
    })
}
