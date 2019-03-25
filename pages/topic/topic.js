// pages/topic/topic.js
const app = getApp()
let promise = require('../../utils/promise.js');

Page({

  // =========================绑定变量数据=============================
  data: {
    tid: 0
  },


  // =============================系统方法=============================
  onLoad: function (options) {
    let tid = options.tid;
    // this.setData({
    //   tid: tid
    // })
    this.specialColumn(tid)
  },


  // ==============================绑定方法============================

  // 专栏文章列表
  specialColumn(tid){
    let url = app.globalData.baseUrl + 'column_get_articles.php';
    let data;
    if(wx.getStorageSync('uid')) {
      data = {
        tid: tid,
        uid: wx.getStorageSync('uid')
      };
    } else {
      data = {
        tid: tid
      };
    }
    promise.request(url, data).then((res)=>{
      this.setData({
        topic: res
      })
    })
  },


})