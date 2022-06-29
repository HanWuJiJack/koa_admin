import {
    requestGet,
    requestDelete,
    requestPost,
    requestPut
} from './../utils/request'
// export function updataUserinfo(data) {
//     return requestPost('/wx//users/login', data)
// }
export function userLogin(data) {
    return requestPost('/wx/users/login', data)
}
export function userCodeLogin(data) {
    return requestPost('/wx/users/code/login', data)
}