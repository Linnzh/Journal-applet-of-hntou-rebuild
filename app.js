//app.js
// let that = this;
let promise = require('/utils/promise.js');

App({

  // ======================变量设定======================

  // 全局变量
  globalData: {
    userInfo: null,
    baseUrl: 'http://localhost:8081/app/applet/'
  },

  onLaunch: function() {

  },


  // =====================全局基本操作=======================

  // checkUser()：检查用户是否已登录。检查本地存储是否有 UID
  checkUser() {
    if (wx.getStorageSync('uid') !== '') {
      return true;
    }
    return false;
  },

  // getUserAuth(event)：获取用户授权，同时获取用户基本信息并存入本地存储
  getUserAuth(event) {
    if (event.detail.userInfo) {
      let info = event.detail.userInfo;
      let name = info.nickName;
      let avatar = info.avatarUrl;
      wx.setStorageSync('name', name);
      wx.setStorageSync('avatar', avatar);
      return true;
    }
    return false;
  },

  // userSignIn()：用户登录
  userSignIn() {
    let that = this;
    let name = wx.getStorageSync('name');
    let avatar = wx.getStorageSync('avatar');
    if (name && avatar) {
      let login = promise.login().then((res) => {
        let data = {
          code: res,
          name: name,
          avatar: avatar
        };
        promise.request(that.globalData.baseUrl + 'user_sign_in.php', data).then((res) => {
          wx.setStorageSync('uid', res);
          console.log(res);
        })
      })
      return true;
    }
    return false;
  },


  // addViews()：增长浏览量
  addViews(aid) {
    wx.request({
      url: this.globalData.baseUrl + 'base_add_views.php?aid=' + aid
    })
  },

  jumpArticle(aid) {
    this.addViews(aid)
    wx.navigateTo({
      url: '/pages/article/article?aid=' + aid
    })
  },

  jumpTopic(tid) {
    wx.navigateTo({
      url: '/pages/topic/topic?tid=' + tid
    })
  },

  switchFavorite(uid, aid){
    let url = this.globalData.baseUrl + 'base_switch_favorite.php'
    let data = {
      uid: uid,
      aid: aid
    }
    promise.request(url, data).then((res)=>{
      // 1.设置 favorite 的值为 res 返回的值
    })
  },


})