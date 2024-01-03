import request from '@/utils/request'


//获取详情
export function getBlog(query) {
    return request({
        url: `custom/faas/get/blog`,
        method: 'get',
        params: query
    })
}

// 获取列表
export function getBlogList(query) {
    return request({
        url: 'custom/faas/list/blog',
        method: 'get',
        params: query
    })
}
//新建
export function addBlog(data) {
    return request({
        url: '/custom/faas/post/blog',
        method: 'post',
        data: data
    })
}

//编辑
export function updataBlog(data) {
    return request({
        url: `/custom/faas/put/blog`,
        method: 'put',
        data: data
    })
}

//删除
export function removeBlog(data) {
    return request({
        url: `/custom/faas/remove/blog`,
        method: 'delete',
        params: data
    })
}
