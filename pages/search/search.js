// pages/search/search.js
const app = getApp();
let utils = require('../../utils/request.js');
let that = this;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
  },

  onLoad: function (options) {
    let kw = options.kw;
    this.setData({
      searchValue: kw
    })
  }

  
})