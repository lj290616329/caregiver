var that;
Page({
  data: {
    url:"https://yq-pas.tsing-care.com/"
  },
  onLoad: function (options) {
    that = this;
    if(options.url){
      that.setData({
        url:options.url
      })
    }
  }
})