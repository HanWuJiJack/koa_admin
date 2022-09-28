import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../layout/Home.vue'
import Welcome from '../views/Welcome/Welcome.vue'
import Login from '../views/Login/Login.vue'
import NotFound from '../views/404.vue'
import publicFn from '../utils/publicFn'
import storage from '../utils/stroage'
import store from '../store'
import NProgress from 'nprogress' // 引入nprogress插件
import { getPermissonMenuList } from "@/api/syetem/menu";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/welcome',
        meta: {
            name: '首页'
        },
        children: [
            {
                path: '/welcome',
                name: 'Welcome',
                component: Welcome,
                meta: {
                    name: '首页'
                }
            },
            // {
            //     path:'/system/users',
            //     name:'Users',
            //     component:() => import('../views/Users/Users.vue'),
            //     meta:{
            //         name:'用户管理'
            //     }
            // },
            // {
            //     path:'/system/menu',
            //     name:'Menu',
            //     component:() => import('../views/Menu/Menu.vue'),
            //     meta:{
            //         name:'菜单管理'
            //     }
            // },
            // {
            //     path:'/system/roles',
            //     name:'Roles',
            //     component:() => import('../views/Roles/Roles.vue'),
            //     meta:{
            //         name:'角色管理'
            //     }
            // },
            // {
            //     path:'/system/dept',
            //     name:'Dept',
            //     component:() => import('../views/Dept/Dept.vue'),
            //     meta:{
            //         name:'部门管理'
            //     }
            // }
        ]
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

const router = createRouter({
    // history: createWebHashHistory("/vue"),
    history: createWebHistory("/vue"),
    scrollBehavior: () => ({ y: 0 }),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (storage.getItem('userInfo') && storage.getItem('userInfo').token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (store.state.menuList.length === 0) {
                getPermissonMenuList().then(res => {
                    store.commit("SET_MENULIST", res.menuList);
                    store.commit("SET_BTNLIST", res.btnList);
                    const routes = publicFn.gennerateRoutes(res.menuList)
                    routes.forEach(item => {
                        router.addRoute('Home', item)
                    })
                    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                }).catch(err => {
                    store.commit("SET_USERINFO", {});
                    store.commit("SET_MENULIST", []);
                    store.commit("SET_BTNLIST", []);
                    next({ path: 'login', replace: true }) // hack方法 确保addRoutes已完成
                })
            } else {
                next()
            }
        }
    } else {
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