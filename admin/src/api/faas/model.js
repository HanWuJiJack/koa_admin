import request from '@/utils/request'


//获取详情
export function getModel(query) {
    return request({
        url: `/custom/faas/get/model`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getModelList(query) {
    return request({
        url: '/custom/faas/list/model',
        method: 'get',
        params: query
    })
}
//新建
export function addModel(data) {
    return request({
        url: '/custom/faas/post/model',
        method: 'post',
        data: data
    })
}

//编辑
export function updataModel(data) {
    return request({
        url: `/custom/faas/put/model`,
        method: 'put',
        data: data
    })
}

//删除
export function removeModel(query) {
    return request({
        url: `/custom/faas/remove/model`,
        method: 'delete',
        params: query
    })
}
