// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  try {
    let signRes = await db.collection('signin').where({  
      teacherId:wxContext.OPENID
    }).get()
    if(event.role==='teacher') {
      return signRes
    }else if(event.role==='student') {
      for(let i=0;i<signRes.data.length;i++){
        signRes.data[i].status = 0
        signRes.data[i].createTime = ''
        const isAttendRes = await cloud.callFunction({
          name:'isAttend',
          data:{
            signInCode:signRes.data[i].signInCode,
            curUser:wxContext.OPENID
          }
        })
        if(isAttendRes.result.data.length!==0) {
          signRes.data[i].status = 1
          signRes.data[i].createTime = isAttendRes.result.data[0].createTime
        }
      }
      return signRes
    }
  }catch(e) {
    console.log(e);
  }
}