// pages/features/features.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from '../../store/store.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    semester:{},
    course:{},
    showCourseChoice: false,
    showSemesterChoice: false,
    courseActions: [
      {
        name: '选项',
        courseId:1
      },
      {
        name: '选项',
      },
      {
        name: '选项',
      },
    ],
    semesterActions: [
      {
        name: '选项',
        courseId:1
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
  onShowSemesterChoice() {
    // console.log(1);
    this.setData({
      showSemesterChoice:true
    })
    wx.hideTabBar()
  },
  onCloseCourseChoice() {
    this.setData({
      showCourseChoice:false
    })
    wx.showTabBar()
  },
  onCloseSemesterChoice() {
    this.setData({
      showSemesterChoice:false
    })
    wx.showTabBar()
  },
  onSelectCourse(e) {
    // console.log(e.detail);
    this.setData({
      course:e.detail
    })
  },
  onSelectSemester(e) {
    // console.log(e.detail);
    this.setData({
      semester:e.detail
    })
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
    const tempSemester = this.data.semesterAndCourseData.map((semester,index)=>{
      // console.log(semester.semesterName);
      return {
        semesterId: semester._id,
        name: semester.semesterName 
      }
    })
    this.setData({
      semesterActions:tempSemester
    })
    let tempCourse = []
    for(let i=0;i<this.data.semesterAndCourseData.length;i++) {
      const tempObj = this.data.semesterAndCourseData[i].courses.map((course,index)=>{
        // console.log(semester.semesterName);
        return {
          courseId: course.courseId,
          name: course.courseName 
        }
      })
      // console.log(tempObj);
      tempCourse = [...tempCourse,tempObj[0]]
    }
    this.setData({
      courseActions:tempCourse
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