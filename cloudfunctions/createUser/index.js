// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const MAX_LIMIT = 1


// 根据openid查询是否有记录

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  const arr = await db.collection('user').where({
    userId: wxContext.OPENID
  }).limit(MAX_LIMIT).get()
  const hasUser = arr.data.length === 1
  //用户是否已存在
  if(hasUser) {
    // 有则获取对应数据库记录进行渲染
    return {
      userInfo:arr,
      _openid: wxContext.OPENID,
    }
  }else {
    // 无则使用默认数据加入数据库记录
      const res = await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        userId: wxContext.OPENID,
        avatarUrl: event.avatarUrl,
        uname: event.uname,
        role: event.role
      }
    })
    return {
      msg: 'ok',
      res,
      _openid: wxContext.OPENID,
    }
  }
}