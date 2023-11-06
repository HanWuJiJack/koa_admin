import stroage from '@/utils/stroage';
import store from './../../store/'
export default {
    beforeMount(el, binding) {
        // console.log(store.state.userInfo.role)
        const btnList = store.state.auth.btnList
        if (store.state.userInfo.role != 0 && !btnList.includes(binding.value)) {
            // 解决进入页面按钮会闪一下再消失问题
            el.style.display = 'none'
            setTimeout(function () {
                el.parentNode.removeChild(el)
            }, 0)
        }
    }
}