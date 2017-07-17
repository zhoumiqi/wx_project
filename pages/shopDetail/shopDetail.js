// shopDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: '',
    windowWidth: '',
    tel: '',
    address: '',
    lat: '',
    lng: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        })
      },
    })
    let item = JSON.parse(options.item);
    this.setData({
      name: item.name,
      tel: item.tel,
      address: item.address,
      lat: item.lat,
      lng: item.lng
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
   * 打开地图
   * 特别注意☆☆☆☆☆☆☆☆
   * 苹果手机里似乎把组件上绑定的参数都当作字符串了，所以认为坐标点不正确，需要强制转换成number类型。
   */
  goToMap: function (event) {
    var lat = Number(this.data.lat)
    var lng = Number(this.data.lng)
    console.log('lat= '+lat+',lng='+lng)
    wx.openLocation({
      latitude: lat,
      longitude: lng,
    })
  },
  /**
   * 打电话
   */
  makeCall: function (event) {
    var tel = this.data.tel
    wx.showModal({
      title: '拨打电话',
      content: tel,
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: tel,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 收藏
   */
  collect: function (event) {
    // wx.showToast({
    //   title: '点击了收藏',
    // })
    //查询未来5天的天气
    //http://api.openweathermap.org/data/2.5/forecast?APPID=304dca6c3121d7f988e6edbf1825b6dc&q=shanghai&mode=xml
    wx.request({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=beijing&APPID=304dca6c3121d7f988e6edbf1825b6dc',
      success:function(response){
        console.log(response)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  /**
   * 跳转到纠错页面
   */
  goToCorrect: function (event) {
    wx.showToast({
      title: '点击了纠错',
    })
  }
})