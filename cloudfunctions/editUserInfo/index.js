// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  try {
    return await db.collection('user').where({
      userId: wxContext.OPENID
    })
    .update({
      data: {// 更新用户名和头像
        avatarUrl: event.avatarUrl,
        uname:event.uname
      },
    })
  } catch(e) {
    console.error(e)
  }
}