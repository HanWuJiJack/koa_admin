import request from '@/utils/request'


//获取详情
export function getProject(query) {
    return request({
        url: `custom/faas/get/100003`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getProjectList(query) {
    return request({
        url: 'custom/faas/list/100003',
        method: 'get',
        params: query
    })
}
//新建
export function addProject(data) {
    return request({
        url: 'custom/faas/100003',
        method: 'post',
        data: data
    })
}

//编辑
export function updataProject(data) {
    return request({
        url: `custom/faas/100003`,
        method: 'put',
        data: data
    })
}

//删除
export function removeProject(data) {
    return request({
        url: `custom/faas/100003`,
        method: 'delete',
        data: data
    })
}
