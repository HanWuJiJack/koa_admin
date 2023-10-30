import request from '@/utils/request'

//获取待审批通知数量
export function getApproveCount(query) {
    return request({
        url: 'auth/admin/leaves/list_count',
        method: 'get',
        params: query
    })
}
// 审核接口
export function postApprove(data){
    return request({
        url: 'auth/admin/leaves/create_approve',
        method: 'post',
        data: data
    })
}