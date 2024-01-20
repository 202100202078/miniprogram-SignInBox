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
    return db.collection('courses_application').aggregate()
      .lookup({
        from:'user',
        localField:'stuId',
        foreignField:'userId',
        as: 'stuInfo'
      })
      .lookup({
        from:'signin_application',
        localField:'stuId',
        foreignField:'stuId',
        as: 'signInInfo'
      })
      .replaceRoot({
        newRoot: $.mergeObjects([ $.arrayElemAt(['$stuInfo', 0]),$.arrayElemAt(['$signInInfo', 0]), '$$ROOT' ])
      })
      .project({
        stuInfo: 0,
        signInInfo: 0
      })
      .match({
        semesterId:event.semesterId,
        courseId:event.courseId,
        signInCode:event.signInCode
      })
      .end({
        success: function (res) {
          return res;
        },
        fail(error) {
          return error;
        }
      })
      // .then(res => console.log(res))
      // .catch(err => console.error(err))
  }catch(e) {
    console.log(e);
  } 
}