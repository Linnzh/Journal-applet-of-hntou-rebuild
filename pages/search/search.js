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

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },


  // ==============================绑定方法============================


  // 跳转至“栏目”详情：传递 tid
  jumpTopic(event) {
    let tid = event.currentTarget.dataset.tid
    app.jumpTopic(tid)
  },

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpArticle(event) {
    let aid = event.currentTarget.dataset.aid
    app.jumpArticle(aid)
  },

  
})