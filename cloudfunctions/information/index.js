// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  switch (event.action) {
    case 'get': {
      return get(event)
    }
    case 'add': {
      return add(event)
    }
    case 'update':{
      return update(event)
    }
    case 'remove':{
      return remove(event)
    }
    default: {
      return
    }
  }
}

async function get(event) {  
  const wxContext = cloud.getWXContext();
  console.log(wxContext)
  const countResult = await db.collection("information").where({
    _openid:wxContext.OPENID
  }).get()
  return {openid:wxContext.OPENID,data:countResult.data};
}

async function add(event) {
  var data = event.data;
  console.log(event);
  console.log("data:"+JSON.stringify(data));
  var result = await db.collection('information').add({
    data:data
  })
  return result;
}
async function update(event) {
  var data = event.data;
  const wxContext = cloud.getWXContext();
  var result = await db.collection('information').where({
    _openid:wxContext.OPENID
  }).update({
    data: data
  })
  
  return result;
}

async function remove(event) {
  const wxContext = cloud.getWXContext();
  var result = await db.collection('information').where({
    _openid:wxContext.OPENID
  }).remove();
  return {openid:wxContext.OPENID};
}