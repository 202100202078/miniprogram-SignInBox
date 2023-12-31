// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const idx = event.courseId
  try {
    return await db.collection('courses').doc(event._id).update({
      data: {
        [`courses.${idx}.lastForWeek`]: _.push({
          start: event.lastForWeek[0],
          end: event.lastForWeek[1]
        }),
        [`courses.${idx}.dayOfWeek`]:_.push(event.dayOfWeek),
        [`courses.${idx}.section`]:_.push({
          start:event.section[0],
          end:event.section[1]
        })
      }
    })
  } catch(e) {
    console.log(e);
  }
}