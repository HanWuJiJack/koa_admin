import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../layout/Home.vue'
import Welcome from '../views/Welcome/Welcome.vue'
import Login from '../views/Login/Login.vue'
import NotFound from '../views/404.vue'
import publicFn from '../utils/publicFn'
import storage from '../utils/stroage'
import store from '../store'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/welcome',
        meta: {
            name: '欢迎使用本产品'
        },
        children: [
            {
                path: '/welcome',
                name: 'Welcome',
                component: Welcome,
                meta: {
                    name: '欢迎页'
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

// 加载动态路由
function loadAsyncRoutes() {
    try {
        // 有登录再进行路由表动态加载
        if (storage.getItem('userInfo') && storage.getItem('userInfo').token) {
            // const { menuList } = await api.getPermissonMenuList()
            const menuList = store.state.menuList || storage.getItem('menuList')
            // console.log("menuList11",menuList)
            const routes = publicFn.gennerateRoutes(menuList)
            // console.log("routes",routes)
            routes.forEach(item => {
                router.addRoute('Home', item)
            })
        }
    } catch (error) {
        console.log(error.stack);
    }
}

// 进入路由守卫前，路由表必须加载完，否则如果在守卫里再加 即使添加成功了，也不生效了
loadAsyncRoutes()
// 判断是否具备当前路由页面权限
// function checkPermisson(path) {

// }
router.beforeEach(async (to, from, next) => {
    if (to.matched.length > 0) {
        next()
    } else {
        next('/404')
    }
})

export default router;