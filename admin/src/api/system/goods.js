import request from '@/utils/request'


//获取详情
export function getGoods(query) {
    return request({
        url: `custom/faas/get/100004`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getGoodsList(query) {
    return request({
        url: 'custom/faas/list/100004',
        method: 'get',
        params: query
    })
}
//新建
export function addGoods(data) {
    return request({
        url: 'custom/faas/100004',
        method: 'post',
        data: data
    })
}

//编辑
export function updataGoods(data) {
    return request({
        url: `custom/faas/100004`,
        method: 'put',
        data: data
    })
}

//删除
export function removeGoods(data) {
    return request({
        url: `custom/faas/100004`,
        method: 'delete',
        data: data
    })
}
//编辑
export function updataGoodsexpress(data) {
    return request({
        url: `custom/faas/100005`,
        method: 'put',
        data: data
    })
}


// 获取全部
export function getGoodsAllList(query) {
    return request({
        url: 'custom/faas/list/100005',
        method: 'get',
        params: query
    })
}
