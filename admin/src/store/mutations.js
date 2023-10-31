import stroage from '@/utils/stroage'
export default {
    // 设置用户信息
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo;
        stroage.setItem('userInfo', userInfo);
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
}