import request from '@/utils/request'


//获取用户列表
export function getUserList(query) {
    return request({
        url: 'api/users/list',
        method: 'get',
        params: query
    })
}
//删除用户
export function postDelUser(data) {
    return request({
        url: 'api/users/delete',
        method: 'post',
        data: data
    })
}
// 获取所有用户列表
export function getAllUserList(query) {
    return request({
        url: 'api/users/all/list',
        method: 'get',
        params: query
    })
}
//新建/修改用户
export function postUserC_U(data) {
    return request({
        url: 'api/users/operate',
        method: 'post',
        data: data
    })
}

//获取用户
export function getUserInfo() {
    return request({
        url: 'api/users/getUserInfo',
        method: 'get',
    })
}

export function changePWS(data) {
    return request({
        url: 'api/users/changePWS',
        method: 'put',
        data: data
    })
}


