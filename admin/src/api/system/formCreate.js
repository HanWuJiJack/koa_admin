import request from '@/utils/request'


//获取详情
export function getFormCreate(query) {
    return request({
        url: `custom/faas/get/form`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getFormCreateList(query) {
    return request({
        url: 'custom/faas/list/form',
        method: 'get',
        params: query
    })
}
//新建
export function addFormCreate(data) {
    return request({
        url: 'custom/faas/post/form',
        method: 'post',
        data: data
    })
}

//编辑
export function updataFormCreate(data) {
    return request({
        url: `/custom/faas/put/form`,
        method: 'put',
        data: data
    })
}

//删除
export function removeFormCreate(data) {
    return request({
        url: `/custom/faas/remove/form`,
        method: 'delete',
        params: data
    })
}
