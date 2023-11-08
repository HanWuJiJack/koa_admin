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
export function getDictTypes(nameCode) {
    return request({
        url: '/auth/admin/dict-type/type/' + nameCode,
        method: 'get',
    })
}
//新建
export function addDictType(data) {
    return request({
        url: '/auth/admin/dict-type',
        method: 'post',
        data: data
    })
}

//编辑
export function updataDictType(data) {
    return request({
        url: `auth/admin/dict-type/${data.id}`,
        method: 'put',
        data: data
    })
}

//删除
export function removeDictType(ids) {
    return request({
        url: `/auth/admin/dict-type/${ids}`,
        method: 'delete',
    })
}
