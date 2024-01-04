// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  // 班级码找不到的情况
  const hasCourseCodeRes = await db.collection('courses').where({
    'courses.courseCode':event.courseCode
  }).get()
  const hasCourseCode = hasCourseCodeRes.data.length === 1
  if(!hasCourseCode) {
    try {
      return {
        msg:'不存在该班级'
      }
    }catch(e) {
      console.log(e);
    }
  } 

  // 获取到当前班级码所在班级信息
  const res = await db.collection('courses').where({
    'courses.courseCode':event.courseCode
  }).get()

  const {courseCode,courseId} = res.data[0].courses[0]
  const semesterId = res.data[0]._id
  const stuId = wxContext.OPENID

  //判断用户是否已经存在班级中
  const isInCourseRes = await db.collection('courses_application').where({
    stuId:wxContext.OPENID
  }).get()
  const isInCourse = isInCourseRes.data.length === 1

  if(isInCourse) {
    try {
      return {
        msg:'用户已经存在班级中'
      }
    }catch(e) {
      console.log(e);
    }
  }else {
    // return {
    //   isInCourse
    // }
    try {
      return await db.collection('courses_application').add({
        data: {
          courseCode,
          courseId,
          stuId,
          semesterId
        }
      })
    }catch(e) {
      console.log(e);
    }
  }
}