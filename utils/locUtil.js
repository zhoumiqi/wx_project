/**
 * 开始定位
 * TODO 可以根据经纬度查询查询具体的位置
 */
function startLocate(cb) {
  wx.getLocation({
    type: 'wgs84',//默认的类型
    success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy
      var locationInfo = '定位成成功：经度=' + longitude + ",纬度=" + latitude
      console.log(locationInfo)
      if (cb) {
        typeof cb == "function" && cb(locationInfo)
      }
    },
  })
}
module.exports = {
  startLocate: startLocate
}