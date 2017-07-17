// weather.js
var inputPlaceholder = '请输入城市的全拼,eg:shanghai'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    windowHeight: '',
    windowWidth: '',
    placeholder: inputPlaceholder,
    result:'',
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
        placeholder: inputPlaceholder
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
        placeholder: inputPlaceholder
      })
    }
  },
  /**
   * 查询今天天气
   */
  queryCurrrent:function(event){
    var that=this
    //查询未来5天的天气
    //http://api.openweathermap.org/data/2.5/forecast?APPID=304dca6c3121d7f988e6edbf1825b6dc&q=shanghai&mode=xml
    wx.request({
      url: 'http://api.openweathermap.org/data/2.5/weather?APPID=304dca6c3121d7f988e6edbf1825b6dc&q=' + that.data.inputValue,
      success: function (response) {
        console.log(response)
        var weather = response.data.weather
        console.log(weather)
        var content = '天气：'+weather[0].main +',描述：'+ weather[0].description
        console.log(content)
        that.setData({
          result: content
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 查询未来天气
   */
  queryFuture: function (event) {
    var that=this
    wx.request({
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=304dca6c3121d7f988e6edbf1825b6dc&units=metric&cnt=7&q=' + that.data.inputValue,
      success: function (response) {
        console.log(response)
        var list = response.data.list
        var temp=''
        for(var i=0;i<list.length;i++){
          var weather=list[i].weather
          temp += (i+1)+'.天气：'+weather[0].main +',描述'+ weather[0].description+'\r\n'
        }
        console.log(temp)
        that.setData({
          result: temp
        })
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: res.errMsg,
        })
      }
    })
  },
})