// pages/course/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInCode:'',
    semesterId:'',
    courseId:'',
    stuInfoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      signInCode:options.signincode,
      semesterId:options.semesterid,
      courseId:options.courseId
    })
    // console.log(options);
    //查询选课表获取当前课程所有学生信息List
    const stuInfoListRes = await wx.cloud.callFunction({
      name:'getStuMemberNameList',
      data:{
        semesterId: options.semesterid,
        courseId:+options.courseId,
        signInCode:this.data.signInCode
      }
    })
    // console.log(stuInfoListRes);
    this.setData({
      stuInfoList:stuInfoListRes.result.res.list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '班级详情',
    })
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