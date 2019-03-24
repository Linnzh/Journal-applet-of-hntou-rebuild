//index.js
const app = getApp()
let utils = require('../../utils/request.js');
let that = this;

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

  onPullDownRefresh: function() {
    this.latestRelease();
    this.recentlyPopular();
    wx.stopPullDownRefresh();
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

  // 切换标签页时刷新数据
  onRefresh(){
    this.latestRelease();
    this.recentlyPopular();
  },

  // 用户登录/注册
  userSignIn(event){
    if (app.getUserAuth(event)) {
      app.userSignIn();
      return wx.getStorageSync('uid');
    } else {
      console.log('用户拒绝了授权');
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
  jumpTopic(event){
    let tid = event.currentTarget.dataset.tid;
    console.log(tid);
    wx.navigateTo({
      url: '/pages/topic/topic?tid=' + tid
    })
  },

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpArticle(event){
    let aid = event.currentTarget.dataset.aid;
    let favorite = event.currentTarget.dataset.favorite;
    app.addViews(aid);
    wx.navigateTo({
      url: '/pages/article/article?aid=' + aid + '&favorite=' + favorite
    })
  },



  // 收藏：检测是否登录
  switchLike(event){
    let list = event.currentTarget.dataset.list;
    let aid = event.currentTarget.dataset.aid;
    let favorite = event.currentTarget.dataset.favorite;
    let index = event.currentTarget.dataset.index;
    if(app.isLoggedIn()) {
      console.log('已授权登录');
    } else {
      this.userSignIn(event);// 返回了 uid
      // let uid = wx.getStorageSync('uid');
    }

    // let uid = this.userSignIn(event);
    let uid = wx.getStorageSync('uid');
    let url = app.globalData.baseUrl + 'base_switch_favorite.php';
    let data = {
      uid: uid,
      aid: aid,
      favorite: favorite
    };
    utils.request(url, data).then(()=>{
      let res = app.netWorkData.result;
      switch(list){
        case 'latest':{
          let arr = this.data.latest;
          arr[index]['favorite'] = res;
          this.setData({
            latest: arr
          })
          // console.log(arr)
        }break;
        case 'recently':{
          let arr = this.data.recently;
          arr[index]['favorite'] = res;
          this.setData({
            recently: arr
          })
        }break;
      }
    })
    console.log('uid:' + uid)
    console.log('aid:' + aid)
    console.log('favorite:' + favorite)
  }


})
