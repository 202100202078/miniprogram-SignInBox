// pages/user/user.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from '../../store/store.js'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teaSignRecord:[],
    semesterAndCourseData:[],
    username:'用户名',
    avatarUrl: defaultAvatarUrl,
    defaultAvatar:defaultAvatarUrl,
    btnStyleObj: 
      `width: 320rpx;
      height: 108rpx;
      border-radius: 30rpx;
      font-size: 48rpx;`,
    isShowCourse: false,
    isTeacher:true,
    openid:'',
    role:'teacher'
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
  showDetail(e) {
    if(!this.data.isTeacher) return;
    const obj = e.target.dataset
    const course = obj.course
    // console.log(e.target.dataset);
    if(!this.data.isShowCourse) {
      // 携带当前签到码作为参数进入detail页面
      wx.navigateTo({
        url: `/pages/course/detail?signincode=${obj.signincode}&semesterid=${obj.semesterid}&courseId=${+obj.courseid}`,
      })
    }else {
      wx.navigateTo({
        url: `/pages/courseInfo/courseInfo?_id=${obj.semesterid}&courseId=${course.courseId}&courseCode=${course.courseCode}&courseName=${course.courseName}`,
      })
    }
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    wx.cloud.callFunction({
      name: 'editUserInfo',
      data:{
        avatarUrl:this.data.avatarUrl,
        role:this.data.role
      }
    })
  },
  async _getCourseInfo() {
    const res = await wx.cloud.callFunction({
      name:'getCourseInfo',
      data:{
        role:this.data.role
      }
    })
    // console.log(res);
    let semesterAndCourseData = res.result.list||res.result.data||[]
    if(this.data.role==='student') {
      for(let i=0;i<semesterAndCourseData.length;i++){
        semesterAndCourseData[i].courses = semesterAndCourseData[i].courses.filter(item=>{
          return item.courseId===semesterAndCourseData[i].courseId
        })
      }
    }
    this.setData({
      semesterAndCourseData:semesterAndCourseData
    })
    this.setCourseInfo(semesterAndCourseData)
  },
  async _getTeaRecord() {
    const teaSignRecordRes = await wx.cloud.callFunction({
      name:'getSignInRecord',
      data:{
        role:this.data.role
      }
    })
    const teaSignRecord = teaSignRecordRes.result.data
    // console.log(teaSignRecord);
    for(let i=0;i<teaSignRecord.length;i++){
      const res = await wx.cloud.callFunction({
        name:'getCourse',
        data:{
          _id:teaSignRecord[i].semesterId
        }
      })
      const courseInfo = res.result.data.courses[+teaSignRecord[i].courseId]
      teaSignRecord[i].classroom = courseInfo.classroom
      teaSignRecord[i].courseName = courseInfo.courseName
      teaSignRecord[i].dayOfWeek = courseInfo.dayOfWeek
      teaSignRecord[i].lastForWeek = courseInfo.lastForWeek
      teaSignRecord[i].section = courseInfo.section
      teaSignRecord[i].tname = courseInfo.tname
    }

    this.setData({
      teaSignRecord
    })
  },
  async _getUserInfo() {
    const userRes = await wx.cloud.callFunction({
      name:'createUser',
      data:{
        avatarUrl:defaultAvatarUrl,
        role:this.data.role,
        uname:'默认用户名'
      }
    })
    // 如果用户已存在数据库则返回用户信息userInfo
    const flag = userRes.result.userInfo
    if(flag) {
      const {uname,role,avatarUrl} = userRes.result.userInfo.data[0]
      this.setData({
        username:uname,
        avatarUrl,
        role
      })
    }
    // 将用户信息存储到Mobx中便于后续使用
    this.setUserInfo({
      uname:this.data.username,
      avatarUrl:this.data.avatarUrl,
      role:this.data.role
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields: ['userInfo'],
      actions: ['setUserInfo','setCourseInfo'],
    })
    this.setData({
      role:options.role,
      isTeacher:options.role==='teacher'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '我的',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    // 每次回到页面重新获取用户数据
    this._getUserInfo()
    //获取当前用户的课程信息
    this._getCourseInfo()
    // 获取sigin表记录
    this._getTeaRecord()
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
    this.storeBindings.destroyStoreBindings()
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