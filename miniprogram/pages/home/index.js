//index.js
const app = getApp()
var that;
Page({
  data: {
    roleName:['浏览用户','培训学员','考核学员','中级(四级)'],
    userInfo: {}
  },
  onLoad: function() {
    that = this;
    that.setData({
      userInfo:wx.getStorageSync('userInfo'),
      information:app.globalData.information
    })
  },
  titleChange(e){
    let val = e.detail.value;
    wx.cloud.callFunction({
      name:"information",
      data:{
        action:"update",
        data:{
          role:val
        }
      },
      success(res){
        console.log(res);
        app.globalData.information.role = val;
        that.setData({
          ["information.role"]:val
        })
      }
    })

    
  }
})
