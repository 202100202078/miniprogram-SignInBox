// pages/features/features.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from '../../store/store.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCourseChoice: false,
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
      },
    ],
  },
  onShowCourseChoice() {
    // console.log(1);
    this.setData({
      showCourseChoice:true
    })
    wx.hideTabBar()
  },
  onCloseCourseChoice() {
    this.setData({
      showCourseChoice:false
    })
    wx.showTabBar()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields: ['semesterAndCourseData']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '签到',
    })
    // console.log(this.data.semesterAndCourseData);
    this.data.semesterAndCourseData.map((semester,index)=>{
      console.log(semester.semesterName);
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