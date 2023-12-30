// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const MAX_LIMIT = 1

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('courses')
    .get()
  }catch(e) {
    console.log(e);
  }
  
}