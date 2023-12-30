// pages/editUserInfo/editUserInfo.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {store} from '../../store/store.js'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname: '默认用户名',
    avatarUrl: defaultAvatarUrl,
    defaultAvatar:defaultAvatarUrl
  },
  onChooseAvatar(e) {
    // console.log(e.detail);
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  confirmEditUserInfo() {
    // 修改对应用户数据库数据
    wx.cloud.callFunction({
      name: 'editUserInfo',
      data:{
        avatarUrl:this.data.avatarUrl,
        uname:this.data.uname
      }
    }).then(res=>{
      console.log(res);
      wx.navigateBack()
      wx.showToast({
        title: '修改成功',
        duration: 1500
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields: [],
      actions: []
    })
    // console.log(options);
    this.setData({
      uname:options.uname,
      avatarUrl:options.avatarUrl
    })
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