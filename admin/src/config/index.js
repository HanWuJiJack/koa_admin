/**
 * 环境变量配置
 */
const env = import.meta.env.VITE_MODE;
const EnvConfig = {
    development: {
        url: "http://localhost:3001/",
        baseUrl: '/OA/',
        wordTemUrl: '/public/doc/',
    },
    production: {
        url: "http://s5.z100.vip:25258/",
        baseUrl: '/OA/',
        wordTemUrl: '/vue/doc/',
    }
}
export default {
    env,
    mock: true,
    stroageSpace: 'manger',//本地存储的命名空间
    ...EnvConfig[env]//根据不同的环境变量解构出对应的地址参数
}