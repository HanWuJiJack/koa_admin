/**
 * 环境变量配置
 */
const env = import.meta.env.VITE_MODE;
const EnvConfig = {
    development:{
        baseUrl:'/OA/',
        // baseUrl:'/',
    },
    production:{
        baseUrl:'/OA/',
    }
}
export default {
    env,
    mock:true,
    stroageSpace:'manger',//本地存储的命名空间
    ...EnvConfig[env]//根据不同的环境变量解构出对应的地址参数
}