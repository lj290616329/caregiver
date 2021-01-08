import WxValidate from '../../utils/WxValidate';
const app = getApp();
var that;
Page({
  data: {
    ifAuth:false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '请稍后...',
    })
    that = this;
    console.log(1)
    that.setData({
      end:true,
      ifAuth:app.globalData.ifAuth
    })
    wx.getSetting({
      withSubscriptions: true,
      success:res=>{
        console.log("success")
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.cloud.callFunction({
            name:"information",
            data:{
              action:"get"
            },
            success(res){
              console.log(res);
              app.globalData.openid = res.result.openid;
              that.setData({
                openid:res.result.openid,
                information:res.result.data[0]||{}
              })
              if(res.result.data.length>0){
                app.globalData.information = res.result.data[0];
                wx.reLaunch({
                  url: '/pages/home/index',
                })
              }
            }
          })
        }else{
          wx.cloud.callFunction({
            name:"information",
            data:{
              action:"remove"
            },
            success(res){
              console.log(res);
              app.globalData.information = {};
              app.globalData.openid = res.result.openid;
              that.setData({
                openid:res.result.openid,
                information:{}
              })
            }
          })
        }
      },
      complete(end){
        console.log("complete")
        wx.hideLoading();
        that.setData({
          end:true
        })
      }
    })
    
    that.initValidate();
  },
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength:2
      },
      id_card:{
        required:true,
        idcard:true
      },
      phone: {
        required: true,
        tel:true
      },
      code: {
        required: true,
        minlength:4
      },
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength:'请输入正确的姓名'
      },
      id_card:{
        required:'请填写身份证号码',
        tel:'请填写正确的身份证号码'
      },
      phone:{
        required:'请填写手机号',
        tel:'请填写正确的手机号'
      },
      code:{
        required:'请填写短信验证码',
        minlength:'请填写正确的短信验证码'
      }
    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  warn(msg){
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
  auth(e){
    console.log(e);
    wx.showLoading({
      mask:true,
      title: '授权中~~',
    })
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      wx.hideLoading();
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        that.warn("授权失败");
        return;
      }
      return;
    };
    app.globalData.ifAuth = true;
    wx.setStorageSync('userInfo', e.detail.userInfo);
    that.formSubmit();
  },
  formCheck(e){
    const params = e.detail.value;
    console.log(params)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      console.log(error)
      that.warn(error.msg);
      return false
    }
    that.setData({
      formData:params
    }) 
    if(app.globalData.ifAuth){
      that.formSubmit();
    }else{
      that.setData({
        auth:true
      })
    }       
  },
  formSubmit(){
    let data = that.data.formData;
    wx.cloud.callFunction({
      name:"information",
      data:{
        action:"add",
        data:data
      },
      success(res){
        console.log(res);
        app.globalData.information = data;
        if(res.errMsg=="cloud.callFunction:ok"){
          wx.reLaunch({
            url: '/pages/index/confirm',
          })
        }
      }
    })
  },
  inputChange(e){
    console.log(e);
    let type = e.currentTarget.dataset.type;
    let val = e.detail.value;
    that.setData({
      ['formData.'+type]:val
    })
  },
  getCode(){
    let nums=new Array("0","1","2","3","4","5","6","7","8","9");
    let str="";                        
    for(let i=0;i<4;i++){     
        //每次生成一个0 - 61 之间的 number 作为随机获取验证码的下标
        var p=Math.floor(Math.random()*1000)%10;
        //拼接验证码  随机抽取大小写字母和数字
        str+=nums[p];
    };
    that.setData({
      code:str
    })
  },
  cancle(){
    that.setData({
      auth:false
    })
  }
})