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
    if(app.checkUser()) {
      this.setData({
        name: wx.getStorageSync('name'),
        avatar: wx.getStorageSync('avatar'),
        uid: wx.getStorageSync('uid'),
        signin: true,
      })

      this.myFavorites()
      this.mySubscribes()
    } else {
      this.setData({
        signin: false
      })
    }
  },

  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh();
  },

  // ==============================绑定方法============================

  mySignin(event){
    let info = app.getUserAuth(event)
    if(info) {
      app.userSignIn(info.name, info.avatar).then((res) => {
        this.setData({
          uid: res,
          signin: true
        })
        this.myFavorites()
        this.mySubscribes()
      })
    } else {
      console.log('用户拒绝了授权！')
    }
  },

  // 我的喜欢-列表
  myFavorites(){
    let url = app.globalData.baseUrl + 'user_favorite_list.php'
    let data = {
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
    let res = mobility.collapse(this.data.current, this.data.previous, this.data.active);
    this.setData({
      previous: res.previous,
      active: res.active
    })
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
    wx.showToast({
      title: '取消收藏成功！',
      duration: 2000
    })
  },


  // 取消订阅
  cancelSubscribe(event){
    let that = this
    let tag = event.currentTarget.dataset.tag
    wx.showModal({
      title: '提示',
      content: '您确定取消订阅' + tag + '吗?',
      success(res) {
        if(res.confirm) {
          let tid = event.currentTarget.dataset.tid
          let url = app.globalData.baseUrl + 'user_cancel_subscribe.php'
          let data = {
            uid: that.data.uid,
            tid: tid
          }
          promise.request(url, data).then((res) => {
            let arr = mobility.checkToMove(event.currentTarget.dataset.index, that.data.subscribes)
            that.setData({
              subscribes: arr
            })
          })
        } else if(res.cancel) {
          // 用户取消了操作
        }
      }
    })
    
  },

  // 跳转至“栏目”详情：传递 tid
  jumpTopic(event) {
    let tid = event.currentTarget.dataset.tid;
    app.jumpTopic(tid)
  },

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpArticle(event) {
    let aid = event.currentTarget.dataset.aid;
    let favorite = event.currentTarget.dataset.favorite
    app.jumpArticle(aid, favorite)
  },



})