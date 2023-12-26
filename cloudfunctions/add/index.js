const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const todos = db.collection('todos')


// 云函数入口函数
exports.main = async (event, context) => {
  // 
  return todos.add({
    data: {
      description: "learn cloud database",
      due: new Date("2018-09-01"),
      tags: [
        "cloud",
        "database"
      ],
      location: new db.Geo.Point(113, 23),
      done: false
    }
  }).then(res=>{
    console.log(res);
  });
};
