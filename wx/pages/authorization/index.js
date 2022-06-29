// pages/user/user.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    /**
     * 页面的初始数据
     */
    data: {
        msg: '初始化测试数据',
        userInfo: {}, // 用户的基本信息
    },

    handleParent() {
        console.log('parent')
    },
    handleChild() {
        console.log('child')

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoaded: function (options) {

    },
    // 获取用户信息的回调
    handleGetUserInfo(res) {
        console.log(res)
        if (res.detail &&  res.detail.userInfo) { // 允许
            app.globalData.userInfo = res.detail.userInfo
            wx.switchTab({
                url: '/pages/home/home'
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})