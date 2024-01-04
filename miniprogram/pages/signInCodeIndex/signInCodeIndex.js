// pages/signInCodeIndex/signInCodeIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInCode:'',
    date:'',
    courseName:'课程名',
    duration:'',
    time: 1 * 30 * 60 * 1000,
    timeData: {},
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
  onLoad(options) {
    // console.log(options);
    const signInCode = this.generateRandomNumberCode()
    this.setData({
      courseName:options.courseName,
      duration:options.duration,
      signInCode
    })
    this._setTime()
    this._getDate()
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