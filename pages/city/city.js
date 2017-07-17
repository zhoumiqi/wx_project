// city.js
var locUtil = require('../../utils/locUtil')
//城市列表数组，可以从本地或者网络获取(先排好序再返回)
var cityListArr = [
  { name: "阿坝", index: "A" },
  { name: '阿克苏', index: "A" },
  { name: '阿拉善', index: 'A' },
  { name: '安阳', index: 'A' },
  { name: '北京', index: 'B' },
  { name: '保定', index: 'B' },
  { name: '包头', index: 'B' },
  { name: '重庆', index: 'C' },
  { name: '成都', index: 'C' },
  { name: '长沙', index: 'C' },
  { name: '大理', index: 'D' },
  { name: '达州', index: 'D' },
  { name: '德州', index: 'D' },
  { name: '佛山', index: 'F' },
  { name: '福州', index: 'F' },
  { name: '广州', index: 'G' },
  { name: '桂林', index: 'G' },
  { name: '贵阳', index: 'G' },
  { name: '杭州', index: 'H' },
  { name: '南京', index: 'N' },
  { name: '上海', index: 'S' },
  { name: '深圳', index: 'S' },
  { name: '石家庄', index: 'S' },
  { name: '商丘', index: 'S' },
  { name: '宿迁', index: 'S' },
  { name: '天津', index: 'T' },
  { name: '武汉', index: 'W' },
  { name: '西安', index: 'X' },
  { name: '郑州', index: 'Z' },
]
//热门城市数组
var hotCityArr = [
  { name: "北京" },
  { name: '上海' },
  { name: '广州' },
  { name: '深圳' },
  { name: '杭州' },
  { name: '南京' },
  { name: '武汉' },
  { name: '郑州' },
  { name: '天津' },
  { name: '西安' },
  { name: '成都' },
  { name: '重庆' },
]
//索引选择器数组
var selectorIndexArr = [
  { name: "定" },
  { name: '热' },
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
  { name: 'D' },
  { name: 'E' },
  { name: 'F' },
  { name: 'G' },
  { name: 'H' },
  { name: 'I' },
  { name: 'J' },
  { name: 'K' },
  { name: 'L' },
  { name: 'M' },
  { name: 'N' },
  { name: 'O' },
  { name: 'P' },
  { name: 'Q' },
  { name: 'R' },
  { name: 'S' },
  { name: 'T' },
  { name: 'U' },
  { name: 'V' },
  { name: 'W' },
  { name: 'X' },
  { name: 'Y' },
  { name: 'Z' },
]
/**
 * 列数固定为4
 */
var colums = 4
/**
 * 行数根据热门城市个数和列数来计算
 */
var rows = Math.ceil(hotCityArr.length / colums)
/**
 * 获取列数组
 */
var columsArr = getForArr(colums)
/**
 * 获取行数组
 */
var rowsArr = getForArr(rows)
/**
 * 根据数字获取数组
 */
function getForArr(num) {
  var arr = []
  for (var i = 0; i < num; i++) {
    console.log(i + 'num = ' + num)
    arr.push(i)//去除为pop
  }
  return arr;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    locCityName: '上海',
    windowHeight: 0,//窗体高度
    windowWidth: 0,//窗体宽度
    scrollTop: 0,//竖向滚动条位置
    toView: "ding",//值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素,scroll-into-view的优先级高于scroll-top
    //城市列表
    cityList: cityListArr,
    //城市索引选择列表
    cityListSelector: selectorIndexArr,
    hotCityList: hotCityArr,
    //索引选择器距离窗体顶部距离
    selectorTop: 0,
    //索引名字是否显示
    selectNameShow: false,
    //选中的索引名字
    selectName: '',
    //当前选中索引时的Y轴距离
    curPageY: "",
    //定位信息
    location: '',
    //热门城市列下标数组用于循环加载view
    columsArr: columsArr,
    //热门城市行下标数组用于循环加载view
    rowsArr: rowsArr,
    colums: colums,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          selectorTop: res.windowHeight * 0.05
        })
      },
    })
    //开始定位
    locUtil.startLocate(function (locationInfo) {
      that.setData({
        location: locationInfo
      })
      wx.showToast({
        title: locationInfo,
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
  /**
   * 点击城市列表项
   */
  onItemClick: function (event) {
    console.log(event)
    var cityName = event.target.id
    var city = event.target.dataset.value
    console.log(cityName + city)
    getApp().globalData.locateCity = city
    wx.navigateBack({})
  },

  /**
   * 点击索引开始
   * ☆☆☆☆☆☆特别注意：view的id都不能为中文☆☆☆☆☆
   */
  onItemTouchstart: function (event) {
    console.log(event)
    var index = event.target.dataset.value
    var temp = index
    //3.28版本后scroll-view的scroll-into-view属性ID为汉字失效,
    //id选择器需要以字母下划线开头,所以这里需要转换，且列表中定位和热门的View的id都不能为中文
    if (index && index == "定") {
      index = "ding"
    } else if (index && index == "热") {
      index = "re"
    }
    var pageY = event.touches[0].pageY
    this.setData({
      selectNameShow: true,
      selectName: temp,
      toView: index,
      curPageY: pageY
    })
  },
  /**
   * 点击滑动索引
   */
  onItemTouchmove: function (event) {
    //获取点击索引文字在数组中的下标
    var position = event.target.dataset.position;
    //获取滑动过程中的Y轴距离
    var pageY = event.touches[0].pageY;
    //获取索引列表大小
    var size = this.data.cityListSelector.length
    //根据相对于按下时的索引滑动的Y轴距离计算出滑动了几个索引字母,20为每个索引字母的高度，由wxss中定义
    var num = Math.round((pageY - this.data.curPageY) / 20)//正数则向下移动，负数则向上移动
    //获取需要显示的索引字母内容
    var content = event.target.dataset.value
    if (!(1 > position + num > size)) {
      //移动了num个字母+ 当前索引字母下标position, 在列表中拿到当前触摸位置(滑动后)节点的字母
      content = this.data.cityListSelector[position + num].name
    }
    //设置滑动位置以及显示的索引内容
    this.setData({
      toView: content,
      selectName: content,
    })
  },
  /**
   * 点击(滑动)索引结束
   */
  onItemTouchend: function (event) {
    console.log(event)
    this.setData({
      selectNameShow: false,
      selectName: '',
    })
  },
  /**
   * 点击了定位
   */
  locate: function () {
    var that = this
    locUtil.startLocate(function (locationInfo) {
      that.setData({
        location: locationInfo
      })
      wx.showToast({
        title: locationInfo,
      })
    })
  },
})