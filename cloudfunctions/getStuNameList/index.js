// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var $ = db.command.aggregate

  try {
    return await db.collection('courses_application').aggregate()
    .lookup({
      from: 'user',
      localField: 'stuId',
      foreignField: 'userId',
      as: 'stuInfo',
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$stuInfo', 0]), '$$ROOT' ])
    })
    .project({
      stuInfo: 0
    })
    .match({
      semesterId:event.semesterId,
      courseId:event.courseId,
      role:'student'
    })
    .end()
  }catch(e) {
    console.log(e);
  }
}