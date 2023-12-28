import {observable,action} from 'mobx-miniprogram'

export const store = observable({
  role: '',
  userInfo: {},
  hasUserInfo:false,
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