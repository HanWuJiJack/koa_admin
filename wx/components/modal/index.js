Component({

  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    propOpacity:Number,
    propClose:String,
  },
    /**
   * 启用插槽
   */
  options:{
    multipleSlots: true
  },

  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _showOpenModel(){
			this.triggerEvent('closeModel')
    },
    _stopMove(){
			return
		}
  }

})