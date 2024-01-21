// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
// 当前用户是否出席传入签到码对应签到
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  try {
    return await db.collection('signin_application').where({
      signInCode:event.signInCode,
      stuId:event.curUser
    }).get()  
  } catch(e) {
    console.log(e);
  } 

}