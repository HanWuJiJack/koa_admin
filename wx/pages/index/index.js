//index.js
Page({
  data: {
    text: "This is page data."
  },
  onLoaded: function(options) {
    // 封装后
  },
  // onLoad: function(options) {
  //   // Do some initialize when page load.
  //   // 在页面加载时进行一些初始化。
  // },
  onShow: function() {
    // Do something when page show.
    // 当页面显示时做些什么。
    // 生命周期函数--监听小程序显示 当小程序启动，或从后台进入前台显示，会触发 onShow
  },
  onReady: function() {
    // Do something when page ready.
    // 等页面准备好了做点什么。
  },
  onHide: function() {
    // Do something when page hide.
    // 当页面隐藏时做些什么。
    // 生命周期函数--监听小程序隐藏 当小程序从前台进入后台，会触发 onHide
  },
  onUnload: function() {
    // Do something when page close.
    // 当页面关闭时做些什么。
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    // 拉下来的时候做点什么。
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    // 当页面到达底部时做点什么。
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  onResize: function() {
    // 调整页面大小时执行某些操作
  },
})