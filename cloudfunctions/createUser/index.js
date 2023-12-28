// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const user = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const data = {}
  user.add({
    // data 字段表示需新增的 JSON 数据
    data: {
      avatarUrl: event.avatarUrl,
      uname: event.uname,
      role: event.role
    }
  })
  .then(res => {
    data = res
    // console.log(res)
    data.msg = 'ok'
  })
  return {
    data,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}