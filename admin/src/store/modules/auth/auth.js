import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
    namespaced: true,
    state: () => ({
        menuList: [],
        isRq: true, //是需要请求
        btnList: [],
        routerList: [],
    }),
    mutations: mutations,
    actions: actions,
    getters: getters
}