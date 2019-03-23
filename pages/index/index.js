//index.js
//获取应用实例
const app = getApp()
let utils = require('../../utils/request.js');
let that = this;
// var that = this;

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
    this.recentlyPopular();
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

  // 近期热门
  recentlyPopular(){
    if (app.isLoggedIn()) {
      let uid = wx.getStorageSync('uid');
      let url = app.globalData.baseUrl + 'index_recently_popular.php';
      let data = {
        uid: uid
      };
      utils.request(url, data).then(() => {
        let res = app.netWorkData.result;
        this.setData({
          recently: res
        })
      })
    } else {
      let url = app.globalData.baseUrl + 'index_recently_popular.php';
      let data = {};
      utils.request(url, data).then(() => {
        let res = app.netWorkData.result;
        this.setData({
          recently: res
        })
      })
    }
  },

  // 跳转至“栏目”详情：传递 tid
  jumpColumn(event){
    let tid = event.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '/pages/column/column?tid=' + tid
    })
  },

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpPage(event){
    let aid = event.currentTarget.dataset.aid;
    let favorite = event.currentTarget.dataset.favorite;
    app.addViews(aid);
    wx.navigateTo({
      url: '/pages/article/article?aid=' + aid + '&favorite=' + favorite
    })
  },


  // 收藏：检测是否登录
  like(event){
    let aid = event.currentTarget.dataset.aid;
    let favorite = event.currentTarget.dataset.favorite;
    if(app.isLoggedIn()) {
      console.log('已授权登录');
    } else {
      that.userSignIn();
      // app.getUserAuth(event);
    }
  }


})
