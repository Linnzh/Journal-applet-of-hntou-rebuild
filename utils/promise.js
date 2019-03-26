const app = getApp()

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

module.exports = {
  request: request,
}