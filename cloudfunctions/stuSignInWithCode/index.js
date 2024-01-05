// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  // 检查该签到码对应的签到是否已经结束
  const res = await db.collection('signin').where({
    signInCode:event.signInCode
  }).field({
    isFinish:true
  }).get()
  const isFinish = res.data[0].isFinish
  return {
    isFinish
  }
  // sign表对应字段attend、absence更新
  // try {
  //   return await db.collection('signin_application').add({
  //     data:{
  //       stuId:wxContext.OPENID,
  //       signInCode:event.signInCode
  //     }
  //   })
  // }catch(e) {
  //   console.log(e);
  // }
}