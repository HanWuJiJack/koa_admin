module.exports = {

    // /----------------微信方法封装--------------------------------
    showToast(data) {
        let {
            msg,
            icon = 'none'
        } = data
        wx.showToast({
            title: msg,
            icon,
            mask: true
        })
    },
    showLoading() {
        wx.showLoading({
            title: '加载中',
            mask: true,
        })
    },
    hideLoading() {
        wx.hideLoading()
    }
}