import request from '@/utils/request'

//获取部门列表
export function getDeptList(query){
    return request({
        url: 'api/dept/list',
        method: 'get',
        params: query
    })
    
}
//新建/修改/删除部门
export function postDeptC_U_D(data){
    return request({
        url: 'api/dept/operate',
        method: 'post',
        data: data
    })
}
