// query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '请输入商户名称',
    inputValue: '',
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 输入框聚焦时
   */
  onFocused: function () {
    this.setData({
      placeholder: ''
    })
  },
  /**
   * 输入框失去焦点是
   */
  onFoucusLosted: function (event) {
    if (!this.data.inputValue) {
      this.setData({
        placeholder: '请输入商户名称'
      })
    }
  },
  onTextChanged: function (event) {
    var input = event.detail.value
    if (input) {
      this.setData({
        inputValue: input
      })
    } else {
      this.setData({
        placeholder: '请输入商户名称'
      })
    }
  },
  /**
   * 点击搜索
   */
  search: function () {
    var key = this.data.inputValue
    if (key) {
      //网络请求查询结果
      this.setData({
        searchList: [
          { name: '上海肯德基有限公司永泰餐厅', tel: '021-50652257', address: '东明路2657号', lat: '31.230416', lng: '121.473701' },
          { name: '肯德基(上南乐购店)', tel: '021-33847985', address: '上南路4467号20号金谊广场内(近永泰路)', lat: '31.230416', lng: '121.473701' },
          { name: '肯德基有限公司', tel: '021-33847985', address: '上南路4467号20号', lat: '31.230416', lng: '121.473701' },
          { name: '上海肯德基有限公司永泰餐厅', tel: '021-50652257', address: '东明路2657号', lat: '31.230416', lng: '121.473701' },
          { name: '肯德基(上南乐购店)', tel: '021-33847985', address: '上南路4467号20号金谊广场内(近永泰路)', lat: '31.230416', lng: '121.473701' },
          { name: '肯德基有限公司', tel: '021-33847985', address: '上南路4467号20号', lat: '31.230416', lng: '121.473701' },
          { name: '上海肯德基有限公司永泰餐厅', tel: '021-50652257', address: '东明路2657号', lat: '31.230416', lng: '121.473701' },
          { name: '肯德基(上南乐购店)', tel: '021-33847985', address: '上南路4467号20号金谊广场内(近永泰路)', lat: '31.230416', lng: '121.473701' },
          { name: '肯德基有限公司', tel: '021-33847985', address: '上南路4467号20号', lat: '31.230416', lng: '121.473701' },
        ]
      })
    } else {
      wx.showToast({
        title: '请输入查询关键字',
      })
    }
  },
  /**
   * 点击Item跳转详情页面
   */
  onItemClick:function(event){
    var item = event.currentTarget.dataset.item
    let str = JSON.stringify(item);
    console.log(str)
    wx.navigateTo({
      url: '../shopDetail/shopDetail?item=' + str,
    })
  }
})