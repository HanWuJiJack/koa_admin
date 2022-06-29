import request from '@/utils/request'

//获取待审批通知数量
export function getApproveCount(query) {
    return request({
        url: 'api/leave/count',
        method: 'get',
        params: query
    })
}
// 审核接口
export function postApprove(data){
    return request({
        url: 'api/leave/approve',
        method: 'post',
        data: data
    })
}