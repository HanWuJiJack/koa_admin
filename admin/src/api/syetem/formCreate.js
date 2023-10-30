import request from '@/utils/request'


//获取详情
export function getFormCreate(query) {
    return request({
        url: `custom/faas/get/100002`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getFormCreateList(query) {
    return request({
        url: 'custom/faas/list/100002',
        method: 'get',
        params: query
    })
}
//新建
export function addFormCreate(data) {
    return request({
        url: 'custom/faas/100002',
        method: 'post',
        data: data
    })
}

//编辑
export function updataFormCreate(data) {
    return request({
        url: `custom/faas/100002`,
        method: 'put',
        data: data
    })
}

//删除
export function removeFormCreate(data) {
    return request({
        url: `custom/faas/100002`,
        method: 'delete',
        data: data
    })
}
