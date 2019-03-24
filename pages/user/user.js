// pages/user/user.js
const app = getApp()
let promise = require('../../utils/promise.js');
let that = this;


Page({

  // =========================绑定变量数据=============================
  data: {
    test: ''
  },


  // =============================系统方法=============================
  onLoad: function (options) {
    this.output()
  },

  // ==============================绑定方法============================


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

  output() {
    let that = this
    let name = wx.getStorageSync('name')
    let avatar = wx.getStorageSync('avatar')
    let login = promise.login()
    login.then(
      function(data){
        that.setData({
          test: data
        })
        let code = data
        let signin = that.signUp(name, avatar, code)
        signin.then((res)=>{
          let uid = res
          console.log(uid)
        })
      }
    )

    
  },
  

})