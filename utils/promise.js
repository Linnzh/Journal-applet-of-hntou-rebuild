const app = getApp()
const baseUrl = 'http://localhost:8081/app/applet/'
// const signin  =  'http://localhost:8081/app/applet/user_sign_in.php'

/**
 * request(url, params)
 * 
 * promise版微信小程序网络请求。传递请求服务器的地址、参数。
 * 并将服务器返回结果保存至 app.js 中的全局变量 netWorkData 中
 * 最后返回一个 promise 对象
 */
function request(url, params) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      success: function (res) {
        resolve(res.data)
      }
    })
  })
  return promise
}



/**
 * login()
 * 
 * 获取wx.login()的 code 值
 * 返回 Promise 对象
 */
function login() {
  let promise = new Promise(function (resolve, reject) {
    wx.login({
      success(res) {
        let code = res.code
        resolve(code)
      }
    })
  })
  return promise
}


/**
 * signin(name, avatar, code)
 * 
 * 与服务器进行交互，返回含有 uid 的 Promise 对象
 */
function signin(name, avatar, code) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + 'user_sign_in.php',
      data: {
        name: name,
        avatar: avatar,
        code: code
      },
      method: 'GET',
      seccess: function(res) {
        wx.setStorageSync('uid', res.data)
        resolve(res.data)
      }
    })
  })
  return promise
}


/**
 * switchFavorite(uid, aid, favorite)
 * 
 * 切换“喜欢”状态
 * 返回切换后的“喜欢”状态
 */
function switchFavorite(uid = 0, aid = 0, favorite = false) {
  let promise = new Promise(function(resolve, reject){
    wx.request({
      url: baseUrl + 'base_switch_favorite.php',
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
}


/**
 * switchSubscribe(uid, tid, subscribe)
 * 
 * 切换“订阅”状态
 * 返回切换后的“订阅”状态
 */
function switchSubscribe(uid = 0, tid = 0, subscribe = false) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + 'base_switch_subscribe.php',
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
}


module.exports = {
  request: request,
  login: login,
  signin: signin,
}