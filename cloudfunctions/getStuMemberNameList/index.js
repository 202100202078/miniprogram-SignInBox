// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var $ = db.command.aggregate
  // 获取当前班级所有成员的个人信息及其签到情况
  try {
    const res = await db.collection('courses_application').aggregate()
    .lookup({
      from:'user',
      localField:'stuId',
      foreignField:'userId',
      as: 'stuInfo'
    })
    .replaceRoot({
      newRoot: $.mergeObjects([ $.arrayElemAt(['$stuInfo', 0]), '$$ROOT' ])
    })
    .project({
      stuInfo: 0
    })
    .match({
      semesterId:event.semesterId,
      courseId:event.courseId
    })
    .end({
      success: function (res) {
        return res;
      },
      fail(error) {
        return error;
      }
    })
    for(let i = 0;i<res.list.length;i++){
      res.list[i].status = 0
      res.list[i].createTime = ''
      const signInRes = await db.collection('signin_application').where({
        stuId:res.list[i].stuId,
        signInCode:event.signInCode
      }).get()
      if(signInRes.data.length!==0) {
        res.list[i].createTime = signInRes.data[0].createTime
        res.list[i].status = 1
      }
    }
    return {
      res
    }
  }catch(e) {
    console.log(e);
  } 
}