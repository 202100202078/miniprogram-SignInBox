// pages/signInCodeIndex/signInCodeIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:'',
    signInId:'',
    semesterId:'',
    courseId:0,
    signInCode:'',
    date:'',
    courseName:'课程名',
    duration:'',
    time: 1 * 30 * 60 * 1000,
    timeData: {},
    totalNum:0
  },
  onChange(e) {
    // console.log(e.detail);
    this.setData({
      timeData: e.detail,
    });
  },
  generateRandomNumberCode() {
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  },
  onFinishTime() {
    // 将当前签到的isFinish字段修改为true
    wx.cloud.callFunction({
      name:'setSignInFinishWithCode',
      data:{
        _id:this.data.signInId
      }
    }).then(res=>{
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/user/user',
        })
      },1500)
    })
    clearInterval(this.data.timer)
  },
  async onAbandonFn() {
    // 删除当前的签到记录
    const res = wx.cloud.callFunction({
      name:'abandonSign',
      data:{
        _id:this.data.signInId
      }
    })
    wx.showToast({
      title: '操作成功',
    })
    setTimeout(()=>{
      wx.navigateBack()
    },1500)
  },
  onFinishSignFn() {
    wx.cloud.callFunction({
      name:'setSignInFinishWithCode',
      data:{
        _id:this.data.signInId
      }
    }).then(res=>{
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/user/user',
        })
      },1500)
    })
    clearInterval(this.data.timer)
  },

  _getDate() {
    let myDate = new Date()
    const year =myDate.getFullYear()
    const month = myDate.getMonth()+1
    const day = myDate.getDate()
    const dayOfWeek = myDate.getDay()
    const hours = myDate.getHours()
    const minutes = myDate.getMinutes() 
    const tempDate = `${year}-${month<10?'0'+month:month}-${day<10?'0'+day:day} ${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes} 星期${['日','一','二','三','四','五','六'][dayOfWeek]}`
    this.setData({
      date:tempDate
    })
    // console.log(tempDate);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // console.log(options);
    const signInCode = this.generateRandomNumberCode()
    this.setData({
      courseName:options.courseName,
      duration:options.duration,
      signInCode,
      courseId:options.courseId,
      semesterId:options.semesterId
    })
    this._setTime()
    this._getDate()
    // 获取当前班级总人数
    wx.cloud.callFunction({
      name:'getCourseTotalNum',
      data:{
        semesterId:this.data.semesterId,
        courseId:this.data.courseId
      }
    }).then(res=>{
      this.setData({
        totalNum:res.result.total
      })
    })
    // 创建签到表的一条记录
    const res = await wx.cloud.callFunction({
      name:'createSignInWithCode',
      data:{
        absenceNum:0,
        attendNum:0,
        signInCode:signInCode,
        totalNum:this.data.totalNum,
        isFinish:false,
      }
    })
      this.setData({
        signInId:res.result._id
      })
    const timer = setInterval(async ()=>{
      const res= await wx.cloud.callFunction({
        name:'getSignNumWithCode',
        data:{
          _id:this.data.signInId
        }
      })
      this.setData({
        absenceNum:res.result.data.absenceNum,
        attendNum:res.result.data.attendNum
      })
    },1500)
    this.setData({
      timer
    })
  },
  _setTime() {
    let temp = 0
    if(this.data.duration==='10min') {
      temp = 1*10*60*1000
    }else if(this.data.duration==='5min') {
      temp = 1*5*60*1000
    }else if(this.data.duration==='2min') {
      temp = 1*2*60*1000
    } else if(this.data.duration==='60s') {
      temp = 1*1*60*1000
    }else if(this.data.duration==='30s') {
      temp = 1*1*30*1000
    }else if(this.data.duration==='15s') {
      temp = 1*1*15*1000
    }
    this.setData({
      time:temp
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.data.timer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})