const {getRecommendList,uploadHeadImg,editUser,getUser,getAddressList} = require('./../../../../common/recommend/index')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bCropper: false,
        sUrl: '',
        width: 250, //宽度
        height: 250, //高度
    },

    cropperload(e) {
        console.log("cropper初始化完成");
    },
    loadimage(e) {
        console.log("图片加载完成", e.detail);
        wx.hideLoading();
        //重置图片角度、缩放、位置
        this.cropper.imgReset();
    },
    clickcut(e) {
        console.log(e.detail);
        //点击裁剪框阅览图片
        wx.previewImage({
            current: e.detail.url, // 当前显示图片的http链接
            urls: [e.detail.url] // 需要预览的图片http链接列表
        })
    },
    // 裁剪取消
    cancelChange: function () {
        wx.redirectTo({
            url: `/pages/user/edit/index`
        })
    },
    uploadHeadImgbase(url){
        let that = this
        wx.getFileSystemManager().readFile({
            filePath: url, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              // console.log('data:image/png;base64,' + res.data)
              that.uploadHeadImg_(`data:image/png;base64,${res.data}`)
            }
          })
    },
    async uploadHeadImg_(url){
        let data = await uploadHeadImg({avatar_field:url})
        wx.showToast({
          title: '上传成功！',
          icon:'none'
        })
        setTimeout(()=>{
          wx.redirectTo({
            url: `/pages/user/edit/index`
          })
        },2000)
      },
    // 裁剪确定
    confirmChange: function () {
        var that = this
        // wx.showLoading({title: '上传中...'})
        this.cropper.getImg((obj) => { // 裁剪组件自带方法
            // 这里就是想要截取的图片传给后台的虚拟路径
            // console.log("===>", obj.url)
            that.uploadHeadImgbase(obj.url)
        })
    },

    rotate() {
        //在用户旋转的基础上旋转90°
        this.cropper.setAngle(this.cropper.data.angle + 90);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideShareMenu();
        this.cropper = this.selectComponent("#image-cropper");
        this.setData({
            sUrl:options.imgSrc
        })
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
        app.oGetDataModule.removeStorage('cropperUrl');
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