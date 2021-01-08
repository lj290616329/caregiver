// miniprogram/pages/index/confirm.js
const app = getApp();
var that;
Page({
  data: {
    information:{}
  },
  onLoad: function (options) {
    that = this;
    that.setData({
      information:app.globalData.information
    })
  },
  no(){
    wx.cloud.callFunction({
      name:"information",
      data:{
        action:"remove"
      },
      success(res){
        console.log(res);
        app.globalData.information = {};
        wx.reLaunch({
          url: '/pages/index/login',
        })
      }
    })
  },
  yes(){
    wx.reLaunch({
      url: '/pages/home/index',
    })
  }
})