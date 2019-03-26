// pages/user/user.js
const app = getApp()
let promise = require('../../utils/promise.js')
let mobility = require('../../utils/mobility.js')

Page({

  // =========================绑定变量数据=============================
  data: {
    current: 0,
    previous: 0,
    active: 0,
    uid: 0
  },


  // =============================系统方法=============================
  onLoad: function (options) {
    let name = wx.getStorageSync('name');
    let avatar = wx.getStorageSync('avatar');
    this.setData({
      name: name,
      avatar: avatar
    })

    if(wx.getStorageSync('uid')) {
      this.setData({
        signin: true,
        uid: wx.getStorageSync('uid')
      })
    } else {
      this.setData({
        signin: false
      })
    }

    this.myFavorites()
    this.mySubscribes()
  },

  // ==============================绑定方法============================

  // 我的喜欢-列表
  myFavorites(){
    let url = app.globalData.baseUrl + 'user_favorite_list.php'
    let data = {
      // uid: wx.getStorageSync('uid')
      uid: this.data.uid
    }
    promise.request(url, data).then((res)=>{
      this.setData({
        favorites: res
      })
    })
  },

  // 我的订阅-列表
  mySubscribes(){
    let url = app.globalData.baseUrl + 'user_subscribe_list.php'
    let data = {
      // uid: wx.getStorageSync('uid')
      uid: this.data.uid
    }
    promise.request(url, data).then((res) => {
      this.setData({
        subscribes: res
      })
    })
  },

  // 手风琴效果
  collapse(event){
    this.data.current = event.currentTarget.dataset.current
    console.log(this.data.current)
    let res = mobility.collapse(this.data.current, this.data.previous, this.data.active);
    this.setData({
      previous: res.previous,
      active: res.active
    })
    console.log(this.data.active)
  },

  // 取消收藏
  cancelFavorite(event){
    let aid = event.currentTarget.dataset.aid
    let url = app.globalData.baseUrl + 'user_cancel_favorite.php'
    let data = {
      uid: this.data.uid,
      aid: aid
    }
    promise.request(url, data).then(()=>{
      let arr = mobility.checkToMove(event.currentTarget.dataset.index, this.favorites)
      this.setData({
        favorites: arr
      })
    })
  },


  // 取消订阅
  cancelSubscribe(event){
    let tid = event.currentTarget.dataset.tid
    let url = app.globalData.baseUrl + 'user_cancel_subscribe.php'
    let data = {
      uid: this.data.uid,
      tid: tid
    }
    promise.request(url, data).then(() => {
      let arr = mobility.checkToMove(event.currentTarget.dataset.index, this.subscribes)
      this.setData({
        subscribes: arr
      })
    })
  },


  // 检测登录状态。用户已登录则返回 true，反之返回 false
  isSignIn(){
    if (wx.getStorageSync('uid') !== '') {
      return true;
    }
    return false;
  },

  // 当检测到登录状态时，返回到含有 uid 数据的 Promise 对象
  signIn(){
    let promise = new Promise(
      function(resolve, reject){
        let uid = wx.getStorageSync('uid')
        resolve(uid)
    })
    return promise
  },

  // 未检测到登录状态时，重新连接服务器并返回带有 uid 数据的 Promise 对象
  signUp(name, avatar, code){
    let url = app.globalData.baseUrl + 'user_sign_in.php'
    let data = {
      name: name,
      avatar: avatar,
      code: code
    }
    return promise.request(url, data)
  },

  addFavorite(){
    if(this.isSignIn()) {
      // 用户已登录
      let signin = this.signIn()

    } else {
      // 用户未登录
      let signup = this.signUp()
    }
  },
  

})