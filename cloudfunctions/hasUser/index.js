// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境


const MAX_LIMIT = 1

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  // 根据openid查询是否有记录
  // const res = await user.where({
  //   openid: wxContext.OPENID
  // })
  // .limit(MAX_LIMIT)
  // .get()
  let arr = await db.collection('user').where({
    openid: wxContext.OPENID
  }).limit(MAX_LIMIT).get()

  return {
    _openid: wxContext.OPENID,
    hasUser: arr.data.length === 1
  }
}