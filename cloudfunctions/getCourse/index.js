// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const idx = event.courseId
  try {
    return await db.collection('courses')
    .where({
      _id: event.semesterId,
      [`courses.${idx}.courseId`]: idx
    })
    .field({
      courses:true
    })
    .get()
  }catch(e) {
    console.log(e);
  }
}