import request from '@/utils/request'

//登陆接口
export function postLogin(data) {
    data.isEncrypt = true
    return request({
        url: 'api/users/login',
        method: 'post',
        data: data
    })
}

//获取公钥
export function getPublicras(query) {
    return request({
        url: 'api/publicras',
        method: 'get',
        params: query
    })
}