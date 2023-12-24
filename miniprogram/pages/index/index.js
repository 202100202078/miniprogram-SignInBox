// pages/index/index.js
// import Toast from '@vant/weapp/toast/toast';

const semester = {
  2023: ['春','秋'],
  2022: ['春1','秋'],
  2021: ['春2','秋'],
  2020: ['春3','秋'],
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTeacher:true,
    semester: {
      2023: ['春','秋'],
      2022: ['春1','秋'],
      2021: ['春2','秋'],
      2020: ['春3','秋'],
    },
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
    semesterKeyValue:[],
    isLoading:false
  },
  triggerIdentity(){
    this.setData({
      isTeacher:!this.data.isTeacher
    })
  },
  // 显示弹出层同时关闭TabBar
  createSemester() {
    wx.hideTabBar()
    this.setData({ showSemester: true });
  },
  // 控制弹出层的关闭同时显示TabBar
  onCloseSemester() {
    this.setData({ showSemester: false });
    wx.showTabBar()
    // console.log('关闭');
  },
  // 用户修改弹出层内学期
  onChangeSemester(event) {
    const { picker, value, index } = event.detail;
    // console.log(picker);
    // console.log(value);
    // console.log(index);
    // 随第一列的更新，第二列更新得到对应数据
    picker.setColumnValues(1, semester[value[0]]);
  },
  // picker取消按钮
  onCancelSemester() {
    this.onCloseSemester()
  },
  // picker确认按钮
  onConfirmSemester(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      semesterKeyValue:value
    })
    this.onCloseSemester()
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