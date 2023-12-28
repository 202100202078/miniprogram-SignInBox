// pages/rolechoice/rolechoice.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toUserPage(e) {
    const param = e.target.dataset.myrole
    this.updateRole(param)
    // this.getRole()
    // 选择role后
    // 获取微信个人信息
    wx.getUserProfile({
      desc: '用于显示个人头像与用户名', // 声明获取用户个人信息后的用途
      success: (res) => {
        this.setUserInfo(res.userInfo)
        this.updateHasUserInfo(true)
        console.log(res.userInfo);
        // console.log(res.userInfo);
        // 跳转到用户页
        wx.switchTab({
          url: '/pages/user/user'
        })
      },
      fail: ()=> {
        this.onAuthenticated()
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      actions: ['updateRole','getRole','setUserInfo','getUserInfo','updateHasUserInfo','onAuthenticated']
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
    // 销毁绑定的store
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