import axios from 'axios'
import {
  ElNotification,
  ElMessage,
  ElMessageBox,
  ElLoading
} from 'element-plus'
import stroage from './stroage'
import router from '../router'
import errorCode from './errorCode'
import config from '../config/index'
import store from "./../store";
import {
  encrypt
} from './tools'
import _ from 'lodash'
import {
  refreshToken
} from "@/api/system/users";

// token有效期30分钟
// 当前时间加十分钟超过过期时间刷新一次token
const exp = 10 * 60 * 1000
// const exp = 10 * 1000
let isRefresh = true


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 防抖处理多次提醒问题
const debounceToken = _.debounce(function () {
  ElMessage.error('认证失败或TOKEN过期');
  router.push('/login');
}, 2000, {
  leading: true,
  trailing: false
});

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: config.url,
  // 超时
  timeout: 5000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const userInfo = stroage.getItem('userInfo');
  if (userInfo) {
    config.headers['Authorization'] = 'Bearer ' + userInfo.token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof (value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            if (value[key] !== null && typeof (value[key]) !== 'undefined') {
              let params = propName + '[' + key + ']';
              let subPart = encodeURIComponent(params) + '=';
              url += subPart + encodeURIComponent(value[key]) + '&';
            }
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
      config.data = JSON.stringify(config.params)
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  const publicKey = stroage.getItem('publicKey');
  if (publicKey && config.data && config.data.isEncrypt) {
    for (const key in config.data) {
      if (Object.hasOwnProperty.call(config.data, key)) {
        if (key !== "isEncrypt") {
          config.data[key] = encrypt(publicKey, config.data[key])
        }
      }
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = res.data.message || errorCode[code] || errorCode['default']
    if (code !== 200) {
      ElNotification.error({
        title: msg
      })
      return Promise.reject(msg)
    } else {
      return res.data
    }
  },
  error => {
    let {
      message
    } = error;

    if (message == "Network Error") {
      message = "后端接口连接异常";
      ElMessage({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(message))
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
      ElMessage({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(message))
    }

    let msg = error.response.data.message || message
    const userInfo = stroage.getItem('userInfo');
    if (error.response.status === 401 && userInfo && userInfo.token) {
      store.commit("SET_USERINFO", {});
      store.commit("auth/SET_MENULIST", []);
      store.commit("auth/SET_BTNLIST", []);
      store.commit("auth/SET_ROUTER_LIST", []);
      store.commit("auth/SET_ROUTER_REFRESH");
      debounceToken()
      return Promise.reject('令牌验证失败')
    } else if (error.response.status > 500) {
      ElMessage({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (error.response.status === 403) {
      ElMessage({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else
      ElMessage({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
    return Promise.reject(msg)
  }
)

function request({
  method = 'get',
  url,
  data,
  params,
  headers,
  config = {},
  autoCancel = false
}) {
  method = method.toLowerCase()
  let loading = undefined
  if (method === 'post') {
    loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)'
    });
  }
  if (autoCancel) {
    if (Object.prototype.toString.call(window.cancelApiMap) !== '[object Object]') {
      window.cancelApiMap = {}
    }
    let cc = window.cancelApiMap[url + method]
    if (cc) {
      return Promise.reject('阻止进程')
    }
    config.cancelToken = new axios.CancelToken((c) => {
      window.cancelApiMap[url + method] = c
    })
  }
  return new Promise((resolve, reject) => {
    service({
      method,
      url,
      data,
      params,
      headers,
      ...config
    }).then((res) => {
      // 刷新token
      if (res.exp && Date.now() + exp > res.exp) {
        if (isRefresh) {
          isRefresh = false
          refreshToken().then((res) => {
            const userInfo = stroage.getItem('userInfo');
            userInfo.token = res.token
            stroage.setItem('userInfo', userInfo);
            console.log("token", res.token)
            isRefresh = true

          }).finally(() => {
            resolve(res.data)
          })
        } else {
          resolve(res.data)
        }
      } else {
        resolve(res.data)
      }
    }).catch(error => {
      reject(error)
    }).finally(() => {
      if (loading) {
        loading.close();
        setTimeout(() => {
          loading = undefined
        }, 3000)
      }
      // 请求成功，删除cancel标记
      // window.cancelApiMap[url + method] && (delete window.cancelApiMap[url + method])
    })
  })
}

export default request