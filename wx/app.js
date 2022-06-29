import storage from './utils/storage'
import server from './server/index'
import tools from './utils/tools'
import REGEXP from './utils/RegExp'


App({
  onLaunch(options) {
    // 手机信息
    wx.getSystemInfo({
      success(res) {
        storage.setStorage('phone', res)
      }
    })
    // 手机胶囊信息
    let objCachet = wx.getMenuButtonBoundingClientRect()
    storage.setStorage('cachet', objCachet)
    // 小程序初始化完成时触发，全局只触发一次。参数也可以使用 wx.getLaunchOptionsSync 获取。
  },
  onShow(options) {
    // 小程序启动，或从后台进入前台显示时触发。也可以使用 wx.onAppShow 绑定监听
  },
  onHide() {
    // 小程序从前台进入后台时触发。也可以使用 wx.onAppHide 绑定监听。

  },
  onError(msg) {
    // 小程序发生脚本错误或 API 调用报错时触发。也可以使用 wx.onError 绑定监听。
    console.log(msg)
  },
  // 本地储存
  $storage: storage,
  // api接口
  $server: server,
  // 用户常用方法
  $tools: tools,
  //常用的正则
  $RegExp: REGEXP,
  // 用户信息
  globalData: {
    userInfo: {},
  }
})
require('./page-extend')