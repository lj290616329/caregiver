const util = require("../../utils/util");
var that;
Page({  
  data: {
    show:false,
    ncds:[
      {name:"糖尿病",check:false},
      {name:"慢性心功能衰竭",check:false},
      {name:"高血压",check:false},
      {name:"脑血管病后遗症",check:false},
      {name:"病毒性肝炎",check:false},
      {name:"肝硬化",check:false},
      {name:"尿毒症肾透析",check:false},
      {name:"恶性肿瘤",check:false},      
      {name:"白血病",check:false},
      {name:"再生障碍性贫血",check:false},
      {name:"类风湿性关节炎",check:false},
      {name:"肾病综合症",check:false},
      {name:"系统性红斑狼疮",check:false},
      {name:"精神病",check:false},
      {name:"活动性肺结核",check:false},
      {name:"慢性肺源性心脏病",check:false},
      {name:"器官移植术后使用抗排斥免疫调节剂",check:false}
    ]
  },
  onLoad: function (options) {
    that = this;
    let check_ncds = wx.getStorageSync('ncds')||[];
    that.setData({
      check_ncds:check_ncds,
      time:util.fnTime(new Date()),
      day:new Date(),
      show:check_ncds.indexOf("糖尿病")>-1?false:true
    })
    that.getCheck()
  },
  getCheck(){
    let check_ncds = wx.getStorageSync('ncds')||[];
    let ncds = that.data.ncds;
    ncds.forEach(i=>{
      if(check_ncds.indexOf(i.name)>-1){
        i.check =true;
      }
    })
    that.setData({
      ncds:ncds
    })
  },


  timeChoose(e){
    console.log(e);
    that.setData({
      time:util.fnTime(e.detail.value),
      day:new Date(e.detail.value)
    })
  },
  timechange(e){
    console.log(e);
    let val = e.target.dataset.value;
    console.log(val)
    let day = that.data.day;
    console.log(day)
    day = day.setDate(day.getDate()+parseInt(val));
    console.log(day)
    day = new Date(day);
    console.log()
    that.setData({
      time:util.fnTime(day),
      day:day
    })
  },
  miniapp(){
    wx.navigateToMiniProgram({
      appId:"wxffbd431d1affeacc",
      path:"/pages/personal/index"
    })
  },
  check(e){
    console.log(e);
    let ncds= that.data.ncds;
    let index = e.currentTarget.dataset.index;
    ncds[index].check = !ncds[index].check;
    that.setData({
      ncds:ncds
    })
  },
  ncds(){
    let show = that.data.show;
    that.setData({
      show:!show
    })
  },
  cancle(){
    let check_ncds = [];
    let ncds = that.data.ncds;
    ncds.forEach(i=>{
      if(i.check){
        check_ncds.push(i.name)
      }
    })
    that.setData({
      show:false,
      check_ncds:check_ncds
    });
    wx.setStorageSync('ncds', check_ncds)
  },
  add(){
    wx.navigateTo({
      url: '/pages/ncds/add',
    })
  }
})