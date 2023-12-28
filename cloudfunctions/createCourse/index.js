// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const courses = db.collection('courses')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const data = {}
  courses.add({
    // data 字段表示需新增的 JSON 数据
    data: {
      cname: event.cname,
      desc: event.desc,
      semester: event.semester,
      tname: event.tname,
      teacherId: event.teacherId
    }
  })
  .then(res => {
    data = res
  })
  return {
    data,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}