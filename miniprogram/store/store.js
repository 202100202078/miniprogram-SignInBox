import {observable,action} from 'mobx-miniprogram'

export const store = observable({
  role: '',
  userInfo: {},
  hasUserInfo:false,
  onAuthenticated:action(function(){
    if(this.hasUserInfo) return 
    wx.redirectTo({
      url: '/pages/rolechoice/rolechoice',
    })
    wx.showModal({
      title: '提示',
      content: '为了小程序的正常使用，需要您的个人信息授权',
    })
  }),
  updateHasUserInfo:action(function(param){
    this.hasUserInfo = param
  }),
  setUserInfo:action(function(myuserinfo){
    this.userInfo = myuserinfo
  }),
  getUserInfo:action(function(){
    console.log(this.userInfo);
  }),
  getRole:action(function(){
    console.log(this.role);
  }),
  updateRole:action(function(myRole){
    this.role = myRole
  })
})