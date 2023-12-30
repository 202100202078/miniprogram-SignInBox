// pages/user/user.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from '../../store/store.js'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    openid:''
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
  showDetail() {
    if(!this.data.isTeacher) return;
    // 携带当前课程id作为参数进入detail页面
    wx.navigateTo({
      url: '/pages/course/detail',
    })
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields: ['role'],
      actions: ['setAvatarUrl','setUname','setUserInfo'],
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
  onShow() {
    // 每次回到页面重新获取用户数据
    wx.cloud.callFunction({
      name:'createUser',
      data:{
        avatarUrl:defaultAvatarUrl,
        role:this.data.role,
        uname:'默认用户名'
      }
    }).then(res=>{
      // 如果用户已存在数据库则返回用户信息userInfo
      const flag = res.result.userInfo
      if(flag) {
        const {uname,role,avatarUrl} = res.result.userInfo.data[0]
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
    })    

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