import request from '@/utils/request'


//获取详情
export function getDictType(id) {
    return request({
        url: `auth/admin/dict-type/get/${id}`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getDictTypeList(query) {
    return request({
        url: '/auth/admin/dict-type/list',
        method: 'get',
        params: query
    })
}

// 获取列表
export function getDictTypes(type) {
    return request({
        url: 'auth/admin/dict-type/get_type/' + type,
        method: 'get',
    })
}
//新建
export function addDictType(data) {
    return request({
        url: 'auth/admin/dict-type/create',
        method: 'post',
        data: data
    })
}

//编辑
export function updataDictType(data) {
    return request({
        url: `auth/admin/dict-type/update/${data.id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeDictType(ids) {
    return request({
        url: `/auth/admin/dict-type/remove/${ids}`,
        method: 'delete',
    })
}
