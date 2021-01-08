//app.js
App({
  globalData:{
    ifAuth:false
  },
  onLaunch: function () {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      console.log("设置云开发参数")
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'hpmp-0gc3hyp495d12e28',
        traceUser: true,
      })
    }
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.globalData.ifAuth = true;
          console.log(3)
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log(2)
              wx.setStorageSync('userInfo', res.userInfo)
            }
          })
        }
      }
    })
  }
})
