// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const MAX_LIMIT = 1

// 云函数入口函数
// 获取与当前用户有关的所有课程信息
exports.main = async (event, context) => {
  const db = cloud.database();
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('courses')
    .where({
      'teacherId':wxContext.OPENID
    })
    .orderBy('semesterName','desc')
    .get()
  }catch(e) {
    console.log(e);
  }
  
}