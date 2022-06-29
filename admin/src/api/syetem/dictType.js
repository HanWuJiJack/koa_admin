import request from '@/utils/request'


//获取详情
export function getDictType(id) {
    return request({
        url: `api/dictType/${id}`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getDictTypeList(query) {
    return request({
        url: 'api/dictType/list',
        method: 'get',
        params: query
    })
}

// 获取列表
export function getDictTypes(type) {
    return request({
        url: 'api/dictType/dict/' + type,
        method: 'get',
    })
}
//新建
export function addDictType(data) {
    return request({
        url: 'api/dictType/add',
        method: 'post',
        data: data
    })
}

//编辑
export function updataDictType(data) {
    return request({
        url: `api/dictType/edit/${data.id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeDictType(ids) {
    return request({
        url: `api/dictType/remove/${ids}`,
        method: 'delete',
    })
}
