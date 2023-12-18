// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnStyleObj: 
      `width: 320rpx;
      height: 108rpx;
      border-radius: 30rpx;
      font-size: 48rpx;`,
    isShowCourse: false,
    isTeacher:true
    
  },
  triggle(e) {
    const choice = e.target.dataset.choice
    if(choice==='record' && this.data.isShowCourse) {
      this.setData({
        isShowCourse:!this.data.isShowCourse
      })
    }else if(choice==='course' && !this.data.isShowCourse){
      this.setData({
        isShowCourse:!this.data.isShowCourse
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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