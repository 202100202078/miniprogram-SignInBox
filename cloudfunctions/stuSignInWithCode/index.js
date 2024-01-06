// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  // 签到码找不到的情况
  const hasSignInCodeRes = await db.collection('signin').where({
    'signInCode':event.signInCode
  }).get()
  const hasSignInCode = hasSignInCodeRes.data.length === 1
  if(!hasSignInCode) {
    return {
      msg:'签到码不存在'
    }
  }
  
  //判断当前用户是否是签到码所在班级
  const teaId =  hasSignInCodeRes.data[0].teacherId
  const isInCourseRes = await db.collection('courses_application').where({
    stuId:wxContext.OPENID,
    teaId
  }).get()
  const isInCourse = isInCourseRes.data.length === 1
  if(!isInCourse) {
    return {
      msg:'用户不存在当前签到课程中'
    }
  }

  // 检查该签到码对应的签到是否已经结束
  const isFinish = hasSignInCodeRes.data[0].isFinish
  if(isFinish) {
    return {
      msg:'该签到码已失效'
    }
  }

  // // sign表对应字段attend、absence更新
  // 先读取totalNum和attendNum
  const tempRes = await db.collection('signin').where({
    signInCode:event.signInCode
  }).field({
    totalNum:true,
    attendNum:true
  }).get()
  const attendNum = tempRes.data[0].attendNum + 1
  const totalNum = tempRes.data[0].totalNum

  const updateRes = await db.collection('signin').where({
    signInCode:event.signInCode
  }).update({
    data:{
      attendNum:  _.inc(1),
      absenceNum: totalNum - attendNum
    }
  })
  try {
    return await db.collection('signin_application').add({
      data:{
        stuId:wxContext.OPENID,
        signInCode:event.signInCode
      }
    })
  }catch(e) {
    console.log(e);
  }
}