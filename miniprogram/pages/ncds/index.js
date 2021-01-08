const util = require("../../utils/util");
var that;
Page({
  data: {
    num:"7.12\n7.2",
    show:false,
    ncds:[
      {name:"慢性心功能衰竭",check:false},
      {name:"高血压",check:false},
      {name:"脑血管病后遗症",check:false},
      {name:"病毒性肝炎",check:false},
      {name:"肝硬化",check:false},
      {name:"尿毒症肾透析",check:false},
      {name:"恶性肿瘤",check:false},
      {name:"糖尿病",check:true},
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
    let nums = [7.23,7.1];
    that.setData({
      time:util.fnTime(new Date()),
      day:new Date()
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
  }
})