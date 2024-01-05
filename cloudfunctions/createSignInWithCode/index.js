// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  try {
    return await db.collection('signin').add({
      data:{
        absenceNum:0,
        attendNum:0,
        signInCode:'',
        totalNum:0,
        isFinish:false,
        teacherId:wxContext.OPENID
      }
    })
  }catch(e) {
    console.log(e);
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}