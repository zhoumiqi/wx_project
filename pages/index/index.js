//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'wxProgramDemo',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // jumpRequest: function () {
  //   console.log('更新数据')
  //   this.setData({
  //     motto: 'Hello zhoumiqi'
  //   })
  //   wx.request({
  //     url: 'https://xxxx/login',
  //     data: {
  //       userName: 'zhangsan',
  //       password: '123456'
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log('登录成功：' + res.data)
  //     },
  //     fail: function (res) {
  //       console.log('登录失败')
  //     }
  //   })
  // }
 
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
