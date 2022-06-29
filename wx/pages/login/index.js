const app = getApp()
import Toast from './../../miniprogram_npm/@vant/weapp/toast/toast';
const {
    userCodeLogin,
    userLogin
} = app.$server.user
Page({

    /**
     * 页面的初始数据
     */
    data: {
        params: {}
    },
    // 获取用户信息的回调
    handleGetUserInfo(res) {
        if (res.detail) { // 允许
            app.globalData.userInfo = res.detail.userInfo
        }
        const {
            username,
            password,
        } = this.data
        if (!username || !password) {
            app.$tools.showToast({
                msg: "请检查你的用户名密码！"
            })
        }
        app.$tools.showLoading()
        wx.login({
            success(res) {
                if (res.code) {
                    userLogin({
                        userName: username,
                        userPwd: password,
                        code: res.code
                    }).then((res) => {
                        if (res.code === 403) {
                            app.$tools.showToast({
                                msg: "用户名密码错误！"
                            })
                        }
                        if (res.code === 200) {
                            app.$storage.setStorage('token', res.data.token)
                            app.globalData.userInfo = {
                                ...app.globalData.userInfo,
                                ...res.data
                            }
                            wx.switchTab({
                                url: '/pages/home/home'
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    }).finally(() => {
                        app.$tools.hideLoading()
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    },
    getCode() {
        app.$tools.showLoading()
        const that = this
        wx.login({
            success(res) {
                if (res.code) {
                    userCodeLogin({
                        code: res.code
                    }).then((res) => {
                        if (res.code === 403) {
                            setTimeout(() => {
                                app.$tools.showToast({
                                    msg: "请先绑定账户！"
                                })
                            }, 1000)
                        }
                        if (res.code === 200) {
                            app.$storage.setStorage('token', res.data.token)
                            app.globalData.userInfo = {
                                ...app.globalData.userInfo,
                                ...res.data
                            }
                            wx.switchTab({
                                url: '/pages/home/home'
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    }).finally(() => {
                        app.$tools.hideLoading()
                    })

                } else {
                    app.$tools.showToast({
                        msg: '获取code失败！'
                    })
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoaded: function (options) {
        this.getCode()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})