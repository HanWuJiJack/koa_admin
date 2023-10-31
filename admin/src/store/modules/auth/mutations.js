export default {
    // 设置用户菜单权限列表
    SET_MENULIST(state, menuList) {
        state.isRq = false
        state.menuList = menuList
    },

    // 设置用户按钮权限列表
    SET_BTNLIST(state, btnList) {
        state.btnList = btnList
    },

    // 设置用户按钮权限列表
    SET_ROUTER_LIST(state, btnList) {
        state.routerList = btnList
    },
    
    // 刷新路由
    SET_ROUTER_REFRESH(state) {
        state.isRq = true
    },
    
}