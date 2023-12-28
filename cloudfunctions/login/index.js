// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.code) {
    //发起网络请求
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      method: 'GET',
      data: {
        js_code: event.code,
        appid:'wx5087199686fa7210',
        secret:'4b421656464b3092f6f4e479752fcb25',
        grant_type:'authorization_code'
      },
      success: (res)=>{
        console.log('请求结果:');
        console.log(res);
      }
    })
  } else {
    console.log('登录失败！' + res.errMsg)
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}