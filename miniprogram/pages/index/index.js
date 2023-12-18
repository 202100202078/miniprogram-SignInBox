// pages/index/index.js

const semester = {
  2023: ['春','秋'],
  2022: ['春','秋'],
  2021: ['春','秋'],
  2020: ['春','秋'],
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTeacher:true,
    showSemester:false,
    semesterColumns: [
      {
        values: Object.keys(semester),
        className: 'year',
      },
      {
        values: semester[2023],
        className: 'season',
        defaultIndex: 0,
      },
    ],
    isLoading:false
  },
  triggerIdentity(){
    this.setData({
      isTeacher:!this.data.isTeacher
    })
  },
  createSemester() {
    wx.hideTabBar()
    this.setData({ showSemester: true });
  },
  onCloseSemester() {
    this.setData({ showSemester: false });
    wx.showTabBar()
  },
  onChangeSemester(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, semester[value[0]]);
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
    wx.setNavigationBarTitle({
      title: '首页',
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