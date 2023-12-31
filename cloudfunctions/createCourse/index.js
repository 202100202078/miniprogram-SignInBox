// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境


// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('courses').doc(event._id).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        courses:_.push({
          courseId: event.courseId,
          courseName: event.courseName,
          courseDesc: event.courseDesc,
          tname: event.tname,
          teacherId: wxContext.OPENID,
          lastForWeek:[],
          section:[],
          dayOfWeek:[],
          classroom:[]
        })
      } 
    })
  }catch(e) {
    console.log(e);
  }
}