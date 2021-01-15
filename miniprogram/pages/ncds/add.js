var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    medicaltypes:['城镇职工基本医疗保险','城镇居民基本医疗保险','新型农村合作医疗'],
    index:0,
    tags:[]
  },

  onLoad: function (options) {
    that = this;
  },
  pickerChange(e){
    that.setData({
      index:e.detail.value
    })
  },
  submit(e){
    let ncds = wx.getStorageSync('ncds')||[];
    if(ncds.indexOf('糖尿病')==-1){
      ncds.unshift('糖尿病')
    }
    wx.setStorageSync('ncds', ncds);
    wx.reLaunch({
      url: '/pages/ncds/main',
    })
  },
  tag(e){
    console.log(e);
    let tags = that.data.tags;
    let val = e.currentTarget.dataset.val;
    let i = tags.indexOf(val);
    if(i>-1){      
      tags.splice(i,1);
    }else{
      tags.push(val)
    }
    that.setData({
      tags:tags
    })
  }
})