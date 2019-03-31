//index.js
const app = getApp()
let promise = require('../../utils/promise.js');

Page({

  // =========================绑定变量数据=============================
  data: {
    searchValue: ''
  },


  // =============================系统方法=============================
  onLoad: function(options) {
    // 1.检查用户是否存在
    if(app.checkUser()) {
      this.setData({
        uid: wx.getStorageSync('uid')
      })
    }

    this.latestRelease();
    this.recentlyPopular();
  },

  onPullDownRefresh: function() {
    this.latestRelease();
    this.recentlyPopular();
    wx.stopPullDownRefresh();
  },

  onShow() {
    this.onLoad()
  },


  // ==============================绑定方法============================

  // 关键词搜索
  onSearch(event){
    let kw = this.data.searchValue;
    wx.navigateTo({
      url: '/pages/search/search?kw=' + kw
    })
  },
  onChange(e){
    this.setData({
      searchValue: e.detail
    });
  },

  // 切换标签页时刷新数据
  onRefresh(event){
    console.log(event.detail.index)
    let tabIndex = event.detail.index
    switch(tabIndex){
      case 0:{
        this.latestRelease()
      } break;
      case 1:{
        this.recentlyPopular()
      } break;
    }
  },

  // 用户登录/注册
  userSignIn(event){
    if (app.getUserAuth(event)) {
      app.userSignIn();
      return wx.getStorageSync('uid');
    } else {
      console.log('用户拒绝了授权');
      return false;
    }
  },


  // 最新发布
  latestRelease(){
    if (this.data.uid) {
      let url = app.globalData.baseUrl + 'index_latest_release.php';
      let data = {
        uid: this.data.uid
      };
      promise.request(url, data).then((res) => {
        this.setData({
          latest: res
        })
      })
    } else {
      let url = app.globalData.baseUrl + 'index_latest_release.php';
      let data = {};
      promise.request(url, data).then((res) => {
        this.setData({
          latest: res
        })
      })
    }
  },

  // 近期热门
  recentlyPopular(){
    if (this.data.uid) {
      let url = app.globalData.baseUrl + 'index_recently_popular.php';
      let data = {
        uid: this.data.uid
      };
      promise.request(url, data).then((res) => {
        this.setData({
          recently: res
        })
      })
    } else {
      let url = app.globalData.baseUrl + 'index_recently_popular.php';
      let data = {};
      promise.request(url, data).then((res) => {
        this.setData({
          recently: res
        })
      })
    }
  },

  // 跳转至“栏目”详情：传递 tid
  jumpTopic(event){
    let tid = event.currentTarget.dataset.tid
    app.jumpTopic(tid)
  },

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpArticle(event){
    let aid = event.currentTarget.dataset.aid
    let favorite = event.currentTarget.dataset.favorite
    app.jumpArticle(aid, favorite)
  },



  // 收藏：检测是否登录
  switchFavorite(event){
    // 1.获取必要数据
    let list = event.currentTarget.dataset.list;
    let aid = event.currentTarget.dataset.aid;
    let favorite = event.currentTarget.dataset.favorite;
    let index = event.currentTarget.dataset.index;

    // 2.检查登录状态
    if (this.data.uid) {
      // 已登录
      console.log('已授权登录');
      app.switchFavorite(this.data.uid, aid, favorite).then((res)=>{
        // 根据不同列表的点击，来识别哪个图标应该变色
        switch (list) {
          case 'latest': {
            this.setData({
              [`latest[${index}].favorite`]: res
            })
          } break;
          case 'recently': {
            this.setData({
              [`recently[${index}].favorite`]: res
            })
          } break;
        }
      })
    } else {
      // 未登录，提示登录
      let info = app.getUserAuth(event)
      if(info) {
        app.userSignIn(info.name,  info.avatar).then((res)=>{
          this.setData({
            uid: res
          })

          // 获得授权后刷新相应的列表信息
          switch (list) {
            case 'latest': {
              this.latestRelease()
            } break;
            case 'recently': {
              this.recentlyPopular()
            } break;
          }
        })
      } else {
        console.log('用户拒绝了授权！')
      }
    }
  }


})
