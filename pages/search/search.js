// search.js
var app = getApp()
var locUtil = require('../../utils/locUtil')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locCityName: '上海',
    menuList: [
      { name: '餐饮', src: '../image/mic_jiaotong.png' },
      { name: '家政', src: '../image/icon_movie.png' },
      { name: '搬家', src: '../image/ticket_iocn_xiaobai_xhdpi.png' },
      { name: '洗衣', src: '../image/mic_jiazhuang.png' },
      { name: '银行', src: '../image/mic_yuancailiao.png' },
      { name: '快递', src: '../image/mic_dianqidianzi.png' },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    locUtil.startLocate(function (locateInfo) {
      //定位成功后设置全局的定位城市数据即可
      // app.globalData.locateCity=locationInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('search onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('search onShow')
    var cityName = app.globalData.locateCity
    if (cityName) {
      this.setData({
        locCityName: cityName
      })
    }
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
   * 跳转到城市选择页面
   */
  goToCity: function () {
    wx.navigateTo({
      url: '../city/city',
    })
  },
  /**
   * 菜单Item点击
   */
  onMenueItemClick:function(event){
    console.log(event)
    var key = event.currentTarget.dataset.key
    wx.showToast({
      title: key,
    })
  },
  /**
   * 跳转到关键字查询页面
   */
  goToQuery:function(){
    wx.navigateTo({
      url: '../query/query',
    })
  }
})