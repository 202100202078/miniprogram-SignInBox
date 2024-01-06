// pages/joinCourse/joinCourse.js
import Notify from '@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseCode:''
  },
  confirmJoinCourse() {
    wx.cloud.callFunction({
      name:'joinCourse',
      data:{
        courseCode:this.data.courseCode
      }
    }).then(res=>{
      // console.log(res);
      this.setData({
        courseCode:''
      })
      // console.log(res.result.msg);
      Notify({type:'primary',message:res.result.msg || '操作成功',duration: 1000})
      if(!res.result.msg){
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      }
    })
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
      title: '加入课程',
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