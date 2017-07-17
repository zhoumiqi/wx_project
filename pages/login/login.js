// login.js
var userUtil=require('../../utils/userUtil')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNameHint: '请输入用户名',
    passwordHint: '请输入密码',
    userName: '',
    password: '',
    location: '',
    chooseLocation: '',
    userInfo:'',
  },
  /**
   * 用户名输入框获取焦点
   */
  onUserNameFoucused: function (event) {
    this.setData({
      userNameHint: ''
    })
  },
  /**
   * 用户名输入框失去焦点
   */
  onUserNameFoucusLosted: function (event) {
    var content = event.detail.value
    if (content == '') {
      this.setData({
        userNameHint: '请输入用户名'
      })
    } else {
      this.data.userName = content
    }
  },
  /**
  * 密码输入框获取焦点
  */
  onPasswordFoucused: function (event) {
    this.setData({
      passwordHint: ''
    })
  },
  /**
   * 密码输入框失去焦点
   */
  onPasswordFoucusLosted: function (event) {
    var content = event.detail.value
    if (content == '') {
      this.setData({
        passwordHint: '请输入密码'
      })
    } else {
      this.data.password = content
    }
  },
  /**
   * 登录
   * 登录之前先检查会话有效期
   */
  login: function () {
    var that=this
    userUtil.login(function(result){
      console.log('登录结果：'+result)
      that.setData({
        userInfo:result
      })
    })
  },
  /**
   * 获取经纬度信息
   */
  getLocationInfo: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',//默认的类型
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var info = '经度：' + longitude + ",纬度：" + latitude
        console.log(info)
        that.setData({
          location: info
        })
        /**
         * 打开微信内置地图
         */
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      },
    })
  },
  /**
   * 选择图片
   */
  chooseImage: function () {
    wx.chooseImage({
      count: 3,
      success: function (res) {
        console.log('文件路径：' + res.tempFilePaths)
        wx.showToast({
          title: '选择成功,路径：' + res.tempFilePaths,
        })
      },
    })
  },
  openDocument: function () {
    wx.downloadFile({
      url: 'http://yqfile1.alicdn.com/feae33012e52c71b7f7a2254e1dc176d.pdf',
      success: function (res) {
        var filepath = res.tempFilePath
        wx.openDocument({
          filePath: filepath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: function () {
        console.log('下载失败')
      }

    })
  },
  /**
   * 打开地图选择位置
   */
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        var info = res.name + res.address + res.latitude + res.longitude
        console.log('选择位置：' + info)
        that.setData({
          chooseLocation: info
        })
      },
    })
  },
  /**
   * 拨打电话
   */
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '10010',
    })
  },
  /**
   * 扫码
   */
  scanCode: function () {
    wx.scanCode({
      // onlyFromCamera: true,
      // success: function(res) {},
      success: (res) => {
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 弹出Toast
   */
  showToast: function () {
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 3000
    })
  },
  /**
   * 隐藏Toast
   */
  hideToast: function () {
    wx.hideToast()
  },
  /**
   * 弹出Loading
   */
  showLoading: function () {
    wx.showLoading({
      title: '加载中',
      mask: false//是否显示透明蒙层，防止触摸穿透，默认：false,如果为true则下面视图无法点击
    })
    //由于设置了mask为true,无法操作，添加2秒后自动消失
    //  setTimeout(function () {
    //    wx.hideLoading()
    //  }, 2000)
  },
  /**
   * 隐藏Loading
   */
  hideLoding: function () {
    wx.hideLoading()
  },
  /**
   * 显示模态弹窗
   */
  showModal: function () {
    wx.showModal({
      title: '温馨提示',
      content: '您确实要退出应用么?',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 显示操作菜单
   */
  showActionSheet: function () {
    wx.showActionSheet({
      itemList: [
        '拍照', '打开相册', '最近文件'
      ],
      itemColor: '#c80d4a',
      success: function (res) {
        console.log('选中下标：' + res.tapIndex)
      }
    })
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
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
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
   * 获取当前地图中心的经纬度
   */
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  /**
   * 将地图中心移动到当前定位点
   */
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  /**
   * 平移marker，带动画
   */
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  /**
   * 缩放视野展示所有经纬度
   */
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
})