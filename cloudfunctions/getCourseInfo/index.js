// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const MAX_LIMIT = 1

// 云函数入口函数
// 获取与当前用户有关的所有课程信息
exports.main = async (event, context) => {
  const db = cloud.database();
  const wxContext = cloud.getWXContext()
  const _ = db.command
  const $ = db.command.aggregate

  try {
    if(event.role==='teacher') {
      return await db.collection('courses')
      .where({
        'teacherId':wxContext.OPENID
      })
      .orderBy('semesterName','desc')
      .get()
    }else if(event.role==='student') {
      // 只获取当前学生加入的课程
      return await db.collection('courses_application').aggregate()
      .lookup({
        from: "courses",
        localField: "semesterId",
        foreignField: "_id",
        as: "courseInfo"
      })
      .replaceRoot({
        newRoot: $.mergeObjects([ $.arrayElemAt(['$courseInfo', 0]), '$$ROOT' ])
      })
      .project({
        courseInfo: 0
      })
      .match({
        stuId:wxContext.OPENID
      })
      .end()
    }
  }catch(e) {
    console.log(e);
  }
  
}