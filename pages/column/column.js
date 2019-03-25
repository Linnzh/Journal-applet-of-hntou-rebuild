// pages/column/column.js
const app = getApp()
let promise = require('../../utils/promise.js');

Page({

  // =========================绑定变量数据=============================
  data: {
    sections: {}
  },


  // =============================系统方法=============================
  onLoad: function (options) {
    this.allSections();
  },
  
  onShow: function() {
    // this.allSections();
  },


  // ==============================绑定方法============================

  allSections() {
    let url = app.globalData.baseUrl + 'column_tags_list.php';
    let data;
    if(wx.getStorageSync('uid')) {
      data = {
        uid: wx.getStorageSync('uid')
      };
    } else {
      data = {};
    }
    let that = this;
    promise.request(url, data).then((res)=>{
      that.setData({
        sections: res,
        list: true
      })
    });
  },

})