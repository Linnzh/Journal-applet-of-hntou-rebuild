// pages/topic/topic.js
const app = getApp()
let utils = require('../../utils/request.js');
let that = this;

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