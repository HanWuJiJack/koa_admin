import request from '@/utils/request'


//获取详情
export function getFaas(id) {
    return request({
        url: `api/faas/${id}`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getFaasList(query) {
    return request({
        url: 'api/faas/list',
        method: 'get',
        params: query
    })
}
//新建
export function addFaas(data) {
    return request({
        url: 'api/faas/add',
        method: 'post',
        data: data
    })
}

//编辑
export function updataFaas(data) {
    return request({
        url: `api/faas/edit/${data._id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeFaas(ids) {
    return request({
        url: `api/faas/remove/${ids}`,
        method: 'delete',
    })
}
