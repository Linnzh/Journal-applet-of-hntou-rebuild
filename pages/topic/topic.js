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
    this.setData({
      tid: tid
    })
  },


  // ==============================绑定方法============================

})