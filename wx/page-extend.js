const app = getApp()
const pageExtend = Page => {
    return object => {
        // 导出原生Page传入的object参数中的生命周期函数
        // 由于命名冲突，所以将onLoad生命周期函数命名成了onLoaded
        const {
            onLoaded
        } = object

        // 公共的onLoad生命周期函数
        object.onLoad = function (options) {

            // 在onLoad中执行的代码
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            app.globalData.currentPage = `/${currentPage.route}`;
            // 监听是否已经授权
            // 不监听页面
            const whileList = ["/pages/authorization/index", "/pages/login/index"]
            // console.log(whileList.includes(app.globalData.currentPage))
            // (!whileList.includes(app.globalData.currentPage) && !app.globalData.userInfo)
            if (!whileList.includes(app.globalData.currentPage)) {
                wx.getUserInfo({
                    success: (res) => {
                        app.globalData.userInfo = {
                            ...app.globalData.userInfo,
                            ...res.userInfo
                        }
                    },
                    fail: (err) => {
                        wx.reLaunch({
                            url: '/pages/authorization/index'
                        })
                    }
                })
                // 检查session_key 是否过期
                wx.checkSession({
                    success() {},
                    fail() {
                        wx.login({
                            success(res) {
                                if (res.code) {
                                    userCodeLogin({
                                        code: res.code
                                    }).then((res) => {
                                        if (res.code === 200) {
                                            app.$storage.setStorage('token', res.data.token)
                                            app.globalData.userInfo = {
                                                ...app.globalData.userInfo,
                                                ...res.data
                                            }
                                        }
                                    }).catch((err) => {}).finally(() => {})

                                } else {
                                    app.$tools.showToast({
                                        msg: '获取code失败！'
                                    })
                                    console.log('登录失败！' + res.errMsg)
                                }
                            }
                        })
                    }
                })
            }
            // 执行onLoaded生命周期函数
            if (typeof onLoaded === 'function') {
                onLoaded.call(this, options)
            }
        }

        // 公共的onShareAppMessage事件处理函数
        object.onShareAppMessage = () => {
            return {
                title: '公共分享标题'
            }
        }
        return Page(object)
    }
}

// 获取原生Page
const originalPage = Page
// 定义一个新的Page，将原生Page传入Page扩展函数
Page = pageExtend(originalPage)