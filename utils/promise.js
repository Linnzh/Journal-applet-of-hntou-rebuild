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


// function auth() {
//   let promise = new Promise(function(resolve, reject) {
//     wx.getSetting({
//       success(res) {
//         if (!res.authSetting['scope.userInfo']) {
//           wx.authorize({
//             scope: 'userInfo',
//             success() {
//               resolve()
//             }
//           })
//         }
//       }
//     })
//   })
//   return promise
// }


/**
 * info()
 * 
 * 在已经授权的情况下，获取用户信息
 * 返回一个对象，包含 name 和 avatar
 */
// function info() {
//   let promise = new Promise(function(resolve, reject) {
//     wx.getUserInfo({
//       success(res) {
//         const user_info = res.userInfo
//         let data = {
//           name: user_info.nickName,
//           avatar: user_info.avatarUrl
//         }
//         resolve(data)
//         reject(data)
//       }
//     })
//   })
//   return promise
// }


module.exports = {
  request: request,
  login: login,
  signin: signin,
  // info: info,
  // auth: auth
}