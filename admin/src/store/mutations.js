import stroage from '../utils/stroage'
export default {
    // 设置用户信息
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo;
        stroage.setItem('userInfo', userInfo);
    },
    // 设置用户菜单权限列表
    SET_MENULIST(state, menuList) {
        state.menuList = menuList
    },
    // 设置用户按钮权限列表
    SET_BTNLIST(state, btnList) {
        state.btnList = btnList
    },
    // 设置通知数量
    SET_NOTICE_COUNT(state, noticeCount) {
        state.noticeCount = noticeCount
        stroage.setItem('noticeCount', noticeCount)
    },

    // 设置场景表单
    SET_ENVIRONMENT_FORM(state, environmentForm) {
        state.environmentForm = environmentForm
        stroage.setItem('environmentForm', environmentForm)
    }
    // store.commit('increment')
}