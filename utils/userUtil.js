/**
 * 用户工具类
 * callback 回调函数
 */
function login(callback){
  var result
  // wx.checkSession({
  //     success: function () {
  //       //session 未过期，并且在本生命周期一直有效
  //       console.log('session 未过期，并且在本生命周期一直有效')
  //     },
  //     fail: function () {
        //登录态过期
        //调用微信开放接口登录获取code
        wx.login({
          success: function (res) {
            var code = res.code
            if(code){
              console.log('登录成功,code = ' + code)
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcf351ff9e9274255&secret=04432c2cff8511fe667bbc5ef1c90eb6&js_code=' + code + '&grant_type=authorization_code',
                success: function (res) {
                  result = 'openid = ' + res.data.openid + ",session_key=" + res.data.session_key
                  console.log('code = ' + code + ',response = ' + result)
                  if (res.data.openid && res.data.session_key){
                    typeof callback == "function" && callback(result)
                  }
                  if (res.statusCode == 200) {
                    wx.showToast({
                      title: result,
                    })
                  }
                },
                fail: function (res) {
                  console.log('获取openid以及session_key失败,errcode=' + res.data.errcode + ',errmsg = ' + res.data.errmsg)
                }
              })
            }else{
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          },
          fail: function (res) {
            console.log('登录失败')
           },
          complete: function (res) { },
        })
    //   }
    // })
  
  return result
}
module.exports.login = login
exports.login = login