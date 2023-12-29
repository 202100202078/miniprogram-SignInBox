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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields: ['role']
    })

    // wx.cloud.callFunction({
    //   name:'quickstartFunctions',
    //   data: {
    //     type: 'getOpenId'
    //   },
    // }).then(res=> {
    //   // console.log(res.result.openid);
    //   this.setData({
    //     openid:res.result.openid
    //   })
    // })
    // 根据openid查看数据库是否有该用户
    // const openid = this.data.openid
    // let hasUser = false
    // wx.cloud.callFunction({
    //   name: 'hasUser',
    // }).then(res=>{
    //   console.log(res.result.res.data.length);
    //   hasUser = res.result.res.data.length===1
    // })
    // console.log(hasUser);
    // 有则获取对应数据库记录进行渲染
    // 无则使用默认数据加入数据库记录
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    wx.cloud.callFunction({
      name:'createUser'
    }).then(res=>{
      console.log(res);
    })
    // console.log(this.data.userInfo);
    // console.log(this.data.role);
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'createUser',
    //   // 传给云函数的参数
    //   data: {
    //     avatarUrl:this.data.userInfo.avatarUrl,
    //     uname:this.data.userInfo.nickName,
    //     role:this.data.role
    //   },
    // })
    // .then(res => {
    //   console.log(res.result)
    // })
    // .catch(console.error)
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