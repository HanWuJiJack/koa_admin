import request from '@/utils/request'

//获取待审批通知数量
export function getApproveCount(query){
    return request({
        url: 'api/leave/count',
        method: 'get',
        params: query
    })
}
  //获取审批列表数据
  export function getLeaveList(query){
    return request({
        url: 'api/leave/list',
        method: 'get',
        params: query
    })
}
// 申请休假提交接口
export function postLeave_C(data){
    return request({
        url: 'api/leave/operate',
        method: 'post',
        data: data
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


