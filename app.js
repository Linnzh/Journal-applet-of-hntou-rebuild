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
    // let login = promise.login()
    // login.then((res)=>{
    //   console.log(res)
    // })

    // let info = promise.info()
    // info.then((res)=>{
    //   console.log(res)
    // }, (res)=>{
    //   console.log(res)
    // })

    // let auth = promise.auth()
    // auth.then(()=>{
    //   console.log()
    // })

  },


  // =====================全局基本操作=======================

  // isLoggedIn()：检查用户是否已登录。检查本地存储是否有 UID
  isLoggedIn() {
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


})