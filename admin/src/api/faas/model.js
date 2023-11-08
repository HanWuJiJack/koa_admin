import request from '@/utils/request'


//获取详情
export function getModel(query) {
    return request({
        url: `/auth/admin/model/${query.id}`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getModelList(query) {
    return request({
        url: '/auth/admin/model/list',
        method: 'get',
        params: query
    })
}
//新建
export function addModel(data) {
    return request({
        url: '/auth/admin/model',
        method: 'post',
        data: data
    })
}

//编辑
export function updataModel(data) {
    return request({
        url: `/auth/admin/model/${data.id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeModel(query) {
    return request({
        url: `/auth/admin/model/${query.ids}`,
        method: 'delete',
        params: query
    })
}
