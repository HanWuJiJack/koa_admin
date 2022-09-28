import { createStore } from 'vuex'
import stroage from '../utils/stroage'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'
const state = () => {
    return {
        userInfo: stroage.getItem('userInfo') || {},
        menuList: [],
        btnList: [],
        environmentForm: stroage.getItem('environmentForm') || [],
        noticeCount: 0
    }
}
export default createStore({
    state,
    mutations,
    actions,
    getters,
    modules
})

// 访问 State 和 Getter
// import { computed } from 'vue'
// import { useStore } from 'vuex'

// export default {
//   setup () {
//     const store = useStore()

//     return {
//       // 在 computed 函数中访问 state
//       count: computed(() => store.state.count),

//       // 在 computed 函数中访问 getter
//       double: computed(() => store.getters.double)
//     }
//   }
// }


// 访问 Mutation 和 Action
// import { useStore } from 'vuex'

// export default {
//   setup () {
//     const store = useStore()

//     return {
//       // 使用 mutation
//       increment: () => store.commit('increment'),

//       // 使用 action
//       asyncIncrement: () => store.dispatch('asyncIncrement')
//     }
//   }
// }