import request from '@/utils/request'


//获取详情
export function getDict(id) {
    return request({
        url: `api/dict/${id}`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getDictList(query) {
    return request({
        url: 'api/dict/list',
        method: 'get',
        params: query
    })
}
//新建
export function addDict(data) {
    return request({
        url: 'api/dict/add',
        method: 'post',
        data: data
    })
}

//编辑
export function updataDict(data) {
    return request({
        url: `api/dict/edit/${data.id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeDict(ids) {
    return request({
        url: `api/dict/remove/${ids}`,
        method: 'delete',
    })
}
