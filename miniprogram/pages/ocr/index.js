var that;
Page({
  data: {
    src:'',
    width: 250,//宽度
    height: 300,//高度
    max_width: 400,
    max_height: 400,
    disable_rotate:true,//是否禁用旋转
    disable_ratio: false,//锁定比例
    limit_move: true,//是否限制移动
    edit:true,
    records:[{name:"选择类型",value:""},{name:"饮食习惯",value:""}],
    checks:[],
    vals:['','',''],
    switchs:[],
    disableds:[],
    words:[]
  },
  onLoad: function (options) {
    that = this;
    that.restTypes();
  },
  warn(msg) {
    that.setData({
      warn: true,
      warnMsg: msg
    });
    setTimeout(function () {
      that.setData({
        warn: false,
        warnMsg: ''
      })
    }, 1500);
  },
  typeblur(e){
    console.log(e)
    that.setData({
      type:e.detail.value
    })
  },
  restTypes(){
    let records = that.data.records;
    let types = records.map(item=>{
      return item.name
    });
    that.setData({
      types:types
    })
  },
  textareablue(e){
    let val = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let records = that.data.records;
    
    records[index].value = val;
    that.setData({
      records:records
    })
  },
  add(e){
    setTimeout(() => {
      let type = that.data.type;
      if(type==""){
        return that.warn("请输入类型后再添加")
      }
      let records = that.data.records;
      let i = records.findIndex((item, index) => {
          return item.name==type;
      })
      if(i>-1){
        that.warn("该类型已存在,请重新输入");
        return;
      }
      records.push({name:type,value:''});
      that.setData({
        records:records,
        type:""
      })
      that.restTypes();
    }, 1000);


    
    
  },
  delete(e){
    console.log(e)

    let index = e.currentTarget.dataset.index;
    let records = that.data.records;

    records.splice(index,1);
    
    that.setData({
      records:records
    })
    that.restTypes();
  },
  pickerChange(e){
    console.log(e);
    let val = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let checks = that.data.checks;
    checks[index] = val;
    that.setData({
      checks:checks
    })
  },
  switchChange(e){
    console.log(e);
    let check = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let checks = that.data.checks;
    let switchs = that.data.switchs;
    let records = that.data.records;

    let valindex = checks[index];
    console.log(valindex)
    if(valindex==undefined||valindex==0){
      that.warn("请先选择类型后再进行");
      switchs[index] = false;
      that.setData({
        switchs:switchs
      })
      return;
    }
    let words = that.data.words;
    let disableds = that.data.disableds;
    let oval = records[valindex];
    console.log(oval)
    if(check){
      switchs[index] = true;   
      disableds[index] = true;   
      oval.value = (oval.value?oval.value+" ":"") +  words[index].words;
    }else{
      switchs[index] = false;
      let i = oval.value.indexOf(words[index].words);
      console.log(i)
      if(i>-1){
        oval.value = oval.value.replace(words[index].words,"")
      }
      disableds[index] = false;
    }
    records[valindex] = oval;
    console.log(oval)
    console.log(records)
    that.setData({
      records:records,
      disableds:disableds,
      switchs:switchs
    })
  },
  //图片剪切
  cropperload(e) {
    console.log('cropper加载完成');
  },
  loadimage(e){
    wx.hideLoading();
    console.log('图片');
    that.cropper.imgReset();
  },
  
  clickcut(e) {
    console.log(e.detail);
    wx.getFileSystemManager().readFile({          
      filePath: e.detail.url,          
      encoding: 'base64',          
      success: function(res) {            
        console.log("[读取图片数据success]",res.data);            
        that.scanImageInfo(res.data);    // 调用百度API解析图片获取文字 
        that.setData({
          edit:true,
          switchs:[],
          checks:[]
        })     
      },            
      fail: function(res){            
        console.log("[读取图片数据fail]",res)          
      },            
      complete: function(res){            
        wx.hideLoading()          
      }	
    })
  },
  upload(){
    
    that.setData({
      edit:false
    })
    that.cropper = that.selectComponent("#image-cropper");
    that.getBaiduToken();    // 提前获取access_Token
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '加载中',
        })
        const tempFilePaths = res.tempFilePaths[0];
        //重置图片角度、缩放、位置
        that.cropper.imgReset();
        that.setData({
          src: tempFilePaths
        });
      }
    })
  },
  setWidth(e){
    that.setData({
      width: e.detail.value < 10 ? 10 : e.detail.value
    });
    that.setData({
      cut_left: that.cropper.data.cut_left
    });
  },
  setHeight(e){
    that.setData({
      height: e.detail.value < 10 ? 10 : e.detail.value
    });
    that.setData({
      cut_top: that.cropper.data.cut_top
    });
  },
  switchChangeDisableRatio(e){
    //设置宽度之后使剪裁框居中
    that.setData({
      disable_ratio: e.detail.value
    });
  },
  setCutTop(e) {
    that.setData({
      cut_top: e.detail.value
    });
    that.setData({
      cut_top: that.cropper.data.cut_top
    });
  },
  setCutLeft(e) {
    that.setData({
      cut_left: e.detail.value
    });
    that.setData({
      cut_left: that.cropper.data.cut_left
    });
  },
  switchChangeDisableRotate(e) {
    //开启旋转的同时不限制移动
    if (!e.detail.value){
      that.setData({
        limit_move: false,
        disable_rotate: e.detail.value
      });
    }else{
      that.setData({
        disable_rotate: e.detail.value
      });
    }
  },
  switchChangeLimitMove(e) {
    //限制移动的同时锁定旋转
    if (e.detail.value){
      that.setData({
        disable_rotate: true
      });
    }
    that.cropper.setLimitMove(e.detail.value);
  },
  switchChangeDisableWidth(e) {
    that.setData({
      disable_width: e.detail.value
    });
  },
  switchChangeDisableHeight(e) {
    that.setData({
      disable_height: e.detail.value
    });
  },
  submit(){
    that.cropper.getImg((obj)=>{
      app.globalData.imgSrc = obj.url;
      wx.navigateBack({
        delta: -1
      })
    });
  },
  rotate(){
    //在用户旋转的基础上旋转90°
    that.cropper.setAngle(that.cropper.data.angle+=90);
  },
  top(){
    that.data.top = setInterval(() => {
      that.cropper.setTransform({
        y: -3
      });
    }, 1000 / 60)
  },
  bottom(){
    that.data.bottom = setInterval(() => {
      that.cropper.setTransform({
        y: 3
      });
    }, 1000 / 60)
  },
  left(){
    that.data.left = setInterval(() => {
      that.cropper.setTransform({
        x: -3
      });
    }, 1000 / 60)
  },
  right(){
    that.data.right = setInterval(() => {
      that.cropper.setTransform({
        x: 3
      });
    }, 1000 / 60)
  },
  narrow() {
    that.data.narrow = setInterval(() => {
      that.cropper.setTransform({
        scale: -0.02
      });
    }, 1000 / 60)
  },
  enlarge() {
    that.data.enlarge = setInterval(() => {
      that.cropper.setTransform({
        scale: 0.02
      });
    }, 1000 / 60)
  },
  end(e) {
    clearInterval(that.data[e.currentTarget.dataset.type]);
  },
  // 获取百度access_token  
  getBaiduToken: function(){
    var apiKey = 'nmnQtFnFSKDpbwgHBRxHQuFq';    
    var secKey = 'YGLIat4wkPhyuxywkVsBc8vEjUKOnjij';    
    var tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secKey}`;    
    wx.request({        
      url: tokenUrl,        
      method: 'POST',        
      dataType: 'json',        
      header:{            
        'content-type': 'application/json; charset-UTF-8'        
      },        
      success: function(res){            
        console.log("[BaiduToken获取成功]",res);            
        that.setData({                
          baiduToken: res.data.access_token            				})        
      },        
      fail: function(res){            
        console.log("[BaiduToken获取失败]",res);
      }    
    })  
  },
  // 百度ORC接口调用  
  scanImageInfo: function(imageData){    // 这里的imageData是图片转换成base64格式的数据
    
    const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate?access_token=${that.data.baiduToken}`    // baiduToken是已经获取的access_Token
    // console.log('123',detectUrl) 
      return new Promise(function(resolve,reject){        
      wx.request({            
        url: detectUrl,            
        data: {                
          image: imageData            
        },            
        method: 'POST',            
        dataType: 'json',            
        header:{                
          'content-type': 'application/x-www-form-urlencoded'    // 必须的        
        },            
        success: function(res, resolve){              
          console.log('get word success：',res.data);
          that.setData({
            words:res.data.words_result
          })                        
        },            
        fail : function(res,reject){              
          console.log('get word fail：',res.data);           			
        }
      })
    }) 
  }
})