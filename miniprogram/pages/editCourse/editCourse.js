// pages/editCourse/editCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastForWeek:'',
    whichDay:'',
    section:'',
    showDayPopup:false,
    days:['星期一','星期二','星期三','星期四','星期五','星期六','星期天']
  },
  onCancelDay() {
    this.setData({ showDayPopup: false });
  },
  onConfirmDay(event){
    const { picker, value, index } = event.detail;
    this.setData({ showDayPopup: false,whichDay:value });
  },
  // onDayChange(event) {
  //   const { picker, value, index } = event.detail;
  //   console.log(`当前值：${value}, 当前索引：${index}`);
  // },
  toShowDayPopup() {
    this.setData({ showDayPopup: true });
  },
  onClose() {
    this.setData({ showDayPopup: false });
  },
  addCourseInfo() {
    if(!this.data.section||!this.data.lastForWeek||!this.data.whichDay){
      wx.showToast({
        title: '输入不能为空',
      })
      return
    }
    const lastForWeek = this.data.lastForWeek.split('-')
    const section = this.data.section.split('-')
    // console.log(lastForWeek);
    // console.log(section);
    wx.cloud.callFunction({
      name:'addCourseInfo',
      data:{
        _id:this.data._id,
        courseId: this.data.courseId,
        lastForWeek,
        section,
        dayOfWeek:this.data.whichDay
      }
    }).then(res=>{
      this.setData({
        whichDay:'',
        section:'',
        lastForWeek:''
      })
      wx.showToast({
        title: '添加成功',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    this.setData({
      _id:options._id,
      courseId:options.courseId
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