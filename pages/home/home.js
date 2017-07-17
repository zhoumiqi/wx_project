// home.js
/**
 * 获取随机颜色
 */
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    video_url: '',
    inputValue: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }],
    placeholder: '请输入弹幕内容',
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  reloadContact: function () {
    wx.reLaunch({
      url: '../contact/contact'
    })
  },
  switchPage: function () {
    wx.switchTab({
      url: '../mime/mime'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('call传递过来的数据msg = ' + options.msg)
    var msg = options.msg
    if (msg) {
      wx.showToast({
        title: '接收数据：' + options.msg,
      })
    }
  },
  getVideoUrl: function (event) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          video_url: res.tempFilePath
        })
      }
    })
  },
  //当输入框失去焦点
  onFoucusLost: function (event) {
    var input = event.detail.value
    if (input) {
      this.inputValue = event.detail.value
    } else {
      this.setData({
        placeholder: '请输入弹幕内容'
      })
    }

  },
  /**
   * 发送弹幕
   */
  sendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.videoContext = wx.createVideoContext("myVideoId")
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
    // wx.showToast({
    //   title: '下拉刷新',
    //   icon: 'loading',
    //   complete:function(){
    //     wx.stopPullDownRefresh()
    //   }
    // })
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 3000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // wx.showToast({
    //   title: '加载完成',
    //   icon: 'success'
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  onFoucused: function () {
    this.setData({
      placeholder: ''
    })
  }
})