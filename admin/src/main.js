import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import stroage from './utils/stroage';
import store from './store'
import directives from "@/directives";
import { getPublicras } from "@/api/syetem/login";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

app.config.globalProperties.$stroage = stroage;
app
    .use(router)
    .use(store)
    .use(ElementPlus)

    .use(directives, { router, store })
    .mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
getPublicras().then((res) => {
    // console.log("res.publicKey", res.publicKey)
    stroage.setItem("publicKey", res.publicKey);
}, (err) => {
    console.log(err)
});