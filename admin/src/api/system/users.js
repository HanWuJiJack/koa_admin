import request from '@/utils/request'


//获取用户列表
export function getUserList(query) {
    return request({
        url: 'auth/admin/user/list',
        method: 'get',
        params: query
    })
}

export function postDelUser(data) {
    return request({
        url: 'auth/admin/user/create',
        method: 'post',
        data: data
    })
}
//删除用户
export function removeUser(data) {
    return request({
        url: 'auth/admin/user/del',
        method: 'delete',
        data: data
    })
}
// 获取所有用户列表
export function getAllUserList(query) {
    return request({
        url: 'auth/admin/user/list_all',
        method: 'get',
        params: query
    })
}
//新建/修改用户
export function postUserC_U(data) {
    return request({
        url: `auth/admin/user/create`,
        method: 'post',
        data: data
    })
}


//获取用户
export function getUserInfo() {
    return request({
        url: '/auth/admin/user/list_one',
        method: 'get',
    })
}

export function changePWS(data) {
    return request({
        url: '/auth/admin/user/update_pwd/'+ data.userId,
        method: 'put',
        data: data
    })
}

export function putUserInfo(data) {
    return request({
        url: '/auth/admin/user/update/' + data.userId,
        method: 'put',
        data: data
    })
}