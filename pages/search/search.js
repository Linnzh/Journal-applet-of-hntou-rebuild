// pages/search/search.js
const app = getApp();

Page({

  // =========================绑定变量数据=============================
  data: {
    searchValue: '',
  },


  // =============================系统方法=============================
  onLoad: function (options) {
    let kw = options.kw;
    this.setData({
      searchValue: kw
    })
  },


  // ==============================绑定方法============================


  
})