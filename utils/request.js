const app = getApp()

function request(url, params) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      success: function (res) {
        app.netWorkData.result = res.data
        resolve(res.data);
      }
    })
  });
  return promise;
}

module.exports = {
  request: request
}