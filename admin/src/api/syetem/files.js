import request from '@/utils/request'

//删除
export function removeFiles(data) {
    return request({
        url: `api/goods/file`,
        method: 'delete',
        data: data
    })
}

//新建
export function getZip(data) {
    return request({
        url: 'api/goods/zip',
        method: 'post',
        data: data
    })
}


