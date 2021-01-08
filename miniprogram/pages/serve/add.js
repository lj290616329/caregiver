// miniprogram/pages/serve/add.js
var that;
Page({
  data: {
    imgList:["/images/logo.png","/images/logo.png","/images/logo.png","/images/logo.png","/images/logo.png"]
  },
  onLoad: function (options) {
    that = this;
  },
  upload: function() {
    // 选择图片
    wx.chooseImage({　　　 // 选择图片数量
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片<br>　　　　　　// 定义图片名，为了避免重复我是用的是上传图片的时间戳
        var timestamp = Date.parse(new Date());
        const cloudPath = timestamp + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: resa => {
            console.log('[上传文件] 成功：', resa)
            that.setData({
              imgList: that.data.imgList.concat(resa.fileID)
            })            
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  handleLongPress(e){
    console.log(e);
    let imgs = that.data.imgList;
    let index = e.currentTarget.dataset.index;
    console.log(index)
    imgs.splice(index,1);
    that.setData({
      imgList:imgs
    })
  }
  
})