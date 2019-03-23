//index.js
//获取应用实例
const app = getApp()
let utils = require('../../utils/request.js');
// let that = this;
var that = this;

Page({

  // =========================绑定变量数据=============================
  data: {
    latest: {},
    recently: {},
    searchValue: ''
  },


  // =============================系统方法=============================
  onLoad: function(options) {
    this.latestRelease();
  },



  // ==============================绑定方法============================

  // 关键词搜索
  onSearch(event){
    let kw = that.data.searchValue;
    wx.navigateTo({
      url: '/pages/search/search?kw=' + kw
    })
  },
  onChange(e){
    this.setData({
      searchValue: e.detail
    });
  },

  // 用户登录/注册
  userSignIn(event){
    if (app.getUserAuth(event)) {
      app.userSignIn();
    }
  },


  // 最新发布
  latestRelease(){
    if (app.isLoggedIn()) {
      let uid = wx.getStorageSync('uid');
      let url = app.globalData.baseUrl + 'index_latest_release.php';
      let data = {
        uid: uid
      };
      utils.request(url, data).then(() => {
        let res = app.netWorkData.result;
        this.setData({
          latest: res
        })
      })
    } else {
      let url = app.globalData.baseUrl + 'index_latest_release.php';
      let data = {};
      utils.request(url, data).then(() => {
        let res = app.netWorkData.result;
        this.setData({
          latest: res
        })
      })
    }
  },




})
