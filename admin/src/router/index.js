import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
import _ from "lodash";
import Home from '../layout/Home.vue'
import Welcome from '../views/Welcome/Welcome.vue'
import Login from '../views/Login/Login.vue'
import NotFound from '../views/404.vue'
import publicFn from '../utils/publicFn'
import storage from '../utils/stroage'
import store from '../store'
import NProgress from 'nprogress' // 引入nprogress插件
import {
    getPermissonMenuList
} from "@/api/system/menu";
const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/welcome',
        meta: {
            name: '首页'
        },
        children: [{
            path: '/welcome',
            name: 'Welcome',
            component: Welcome,
            meta: {
                name: '首页',
                code: "000"
            }
        }, ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            name: '登录页面'
        }
    },
    {
        path: '/404',
        name: '404',
        component: NotFound
    }
];
let removeRoutes = []
const router = createRouter({
    // history: createWebHashHistory("/vue"),
    history: createWebHistory("/vue"),
    scrollBehavior: () => ({
        y: 0
    }),
    routes
})
export const getPermissonMenuList_ = async () => {
    const res = await getPermissonMenuList()
    res.menuList.unshift({
        code: "000",
        icon: "House",
        menuType: 2,
        menuName: "首页",
        parentId: [],
        isShow: 1,
        path: "/welcome",
    });
    store.commit("auth/SET_MENULIST", res.menuList);
    store.commit("auth/SET_BTNLIST", res.btnList);
    store.commit("auth/SET_ROUTER_LIST", res.routeList);
    for (let i = 0; i < removeRoutes.length; i++) {
        removeRoutes.pop()()
    }
    const routes = publicFn.gennerateRoutes(res.routeList)
    routes.forEach(item => {
        let route = router.addRoute('Home', item)
        removeRoutes.push(route)
    })
    return routes
}

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (storage.getItem('userInfo') && storage.getItem('userInfo').token) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            if (store.state.auth.routerList.length === 0 && store.state.auth.isRq) {
                getPermissonMenuList_().then((routes) => {
                    next({
                        ...to,
                        replace: true
                    }) // hack方法 确保addRoutes已完成
                }).catch(err => {
                    console.error(err)
                    store.commit("SET_USERINFO", {});
                    store.commit("auth/SET_MENULIST", []);
                    store.commit("auth/SET_BTNLIST", []);
                    store.commit("auth/SET_ROUTER_LIST", []);
                    next({
                        path: 'login',
                        replace: true
                    }) // hack方法 确保addRoutes已完成
                })
            } else {
                if (to.matched.length > 0) {
                    next()
                } else {
                    next('/404')
                }
            }
        }
    } else {
        // console.log(5)
        // 没有token
        if (['/login'].indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        }
    }
})

router.afterEach(() => {
    // document.title = '综合&检测管理'
    NProgress.done()
})
export default router;