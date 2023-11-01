import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import stroage from './utils/stroage';
import store from './store'
import directives from "@/directives";
import {
    getPublicras
} from "@/api/syetem/login";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {
    ElGenerateForm
} from "vue-form-create";
import "./utils/ace"
import 'nprogress/nprogress.css' // 这个nprogress样式必须引入

const app = createApp(App);

app.config.globalProperties.$stroage = stroage;
app
    .use(router)
    .use(store)
    .use(ElementPlus, {
        locale: zhCn,
    })
    .use(directives, {
        router,
        store
    })
    .mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component("el-generate-form", ElGenerateForm)

// 获取公钥
const _getPublicras = () => {
    getPublicras().then((res) => {
        stroage.setItem("publicKey", res.publicKey);
    }, (err) => {
        console.error(err)
        setTimeout(() => {
            _getPublicras()
        }, 3000)
    });
}
_getPublicras()