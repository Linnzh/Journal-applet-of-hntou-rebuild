//app.js
// let that = this;

App({

  // ======================变量设定======================

  // 全局变量
  globalData: {
    userInfo: null,
    baseUrl: 'http://localhost:8081/app/applet/'
  },

  // 网络请求返回结果
  netWorkData: {
    result: {
      code: -1,
      msg: '发起请求失败'
    }
  },

  // 异步执行网络请求：GET
  request(url, params) {
    let that = this;
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: params,
        method: 'GET',
        success: function (res) {
          that.netWorkData.result = res.data
          resolve();
        }
      })
    });
    return promise;
  },

  // =====================全局基本操作=======================

  // isLoggedIn()：检查用户是否已登录。检查本地存储是否有 UID
  isLoggedIn() {
    if(wx.getStorageSync('uid') !== '') {
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

    // console.log(event)
    // console.log(event.detail.userInfo)
  },

  // userSignIn()：用户登录
  userSignIn() {
    let that = this;
    let name = wx.getStorageSync('name');
    let avatar = wx.getStorageSync('avatar');
    if (name && avatar) {
      wx.login({
        success(login) {
          let code = login.code;
          let data =  {
            code: code,
            name: name,
            avatar: avatar
          };
          that.request(that.globalData.baseUrl+'user_sign_in.php', data).then(() => {
            let res = that.netWorkData.result;
            wx.setStorageSync('uid', res);
            // console.log(res);
          })
          // console.log(data);
        }
      })
      return true;
    }
    return false;
  },


  // addViews()：增长浏览量
  addViews(aid){
    wx.request({
      url: this.globalData.baseUrl + 'base_add_views.php?aid=' + aid
    })
  },


})