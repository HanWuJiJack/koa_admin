export default {
    // 设置用户信息
    SET_USERINFO(context, userInfo){
        context.commit('increment',userInfo)
    }
    // store.dispatch('SET_USERINFO')
}