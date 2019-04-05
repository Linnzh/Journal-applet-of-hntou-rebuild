//app.js
let promise = require('/utils/promise.js');

App({

  // ======================变量设定======================

  // 全局变量
  globalData: {
    userInfo: null,
    baseUrl: 'http://localhost:8081/Journal-management-website/app/applet/'
  },

  onLaunch: function() {

  },


  // =====================全局基本操作=======================

  // checkUser()：检查用户是否已登录。检查本地存储是否有 UID
  // checkUser() {
  //   if (wx.getStorageSync('uid') !== '') {
  //     return true;
  //   }
  //   return false;
  // },

  // getUserAuth(event)：获取用户授权，同时获取用户基本信息并存入本地存储
  getUserAuth(event) {
    if (event.detail.userInfo) {
      let info = event.detail.userInfo;
      let name = info.nickName;
      let avatar = info.avatarUrl;
      wx.setStorageSync('name', name);
      wx.setStorageSync('avatar', avatar);
      return {
        name: name,
        avatar: avatar
      }
    }
    return null
  },

  // userSignIn()：用户登录
  userSignIn(name, avatar) {
    let that = this
    let promise = new Promise(function (resolve, reject) {
      wx.login({
        success(res) {
          wx.request({
            url: that.globalData.baseUrl + 'user_sign_in.php',
            data: {
              name: name,
              avatar: avatar,
              code: res.code
            },
            method: 'GET',
            success(res) {
              wx.setStorageSync('uid', res.data)
              resolve(res.data)
            }
          })
        }
      })
    })
    return promise
  },


  // addViews()：增长浏览量
  addViews(aid) {
    wx.request({
      url: this.globalData.baseUrl + 'base_add_views.php?aid=' + aid
    })
  },

  // 跳转至 article
  jumpArticle(aid, favorite) {
    wx.setStorageSync('aid', aid)
    wx.setStorageSync('favorite', favorite)

    this.addViews(aid)
    wx.navigateTo({
      url: '/pages/article/article?aid=' + aid + '&favorite=' + favorite
    })
  },

  // 跳转至 topic
  jumpTopic(tid) {
    wx.setStorageSync('tid', tid)
    
    wx.navigateTo({
      url: '/pages/topic/topic?tid=' + tid
    })
  },


  // 切换【喜欢】状态
  switchFavorite(uid, aid, favorite){
    let url = this.globalData.baseUrl + 'base_switch_favorite.php'
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: {
          uid: uid,
          aid: aid,
          favorite: favorite
        },
        method: 'GET',
        success(res) {
          resolve(res.data)
        }
      })
    })
    return promise
  },


  // 切换【订阅】状态
  switchSubscribe(uid, tid, subscribe) {
    let url = this.globalData.baseUrl + 'base_switch_subscribe.php'
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: {
          uid: uid,
          tid: tid,
          subscribe: subscribe
        },
        method: 'GET',
        success(res) {
          resolve(res.data)
        }
      })
    })
    return promise
  }


})