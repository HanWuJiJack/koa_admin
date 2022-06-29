const app = getApp()
Page({
    data: {},
    scan() {
        // 允许从相机和相册扫码
        wx.scanCode({
            // onlyFromCamera: true,// 只允许从相机扫码
            success(res) {
                console.log(res)
            }
        })
    },
    onLoaded: function (options) {
        // console.log("=>",app)
    },
    showMore: function () {
        wx.navigateTo({
            url: '/pages/more/more',
        })
    },
    open: function () {
        wx.showActionSheet({
            itemList: ['生成朋友圈分享图', '转发给好友或群聊', '生成长图'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        });
    }
})