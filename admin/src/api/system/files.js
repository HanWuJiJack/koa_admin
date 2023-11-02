import request from '@/utils/request'

//删除
export function removeFiles(data) {
    return request({
        url: `auth/admin/file/remove`,
        method: 'delete',
        data: data
    })
}

//新建
export function getZip(data) {
    return request({
        url: 'auth/admin/file/create_goods',
        method: 'post',
        data: data
    })
}


