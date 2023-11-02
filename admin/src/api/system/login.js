import request from '@/utils/request'

//登陆接口
export function postLogin(data) {
    data.isEncrypt = true
    return request({
        url: '/open/admin/p/login/create',
        method: 'post',
        data: data
    })
    // return request({
    //     url: 'auth/admin/user/create',
    //     method: 'post',
    //     data: data
    // })
}

//获取公钥
export function getPublicras(query) {
    return request({
        url: 'open/admin/p/ras/list_one',
        method: 'get',
        params: query
    })
}