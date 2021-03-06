// pages/search/search.js
const app = getApp()
let promise = require('../../utils/promise.js')

Page({

  // =========================绑定变量数据=============================
  data: {
    searchValue: '',
    exitTopic: false,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    column:[],
    articles:[]
  },


  // =============================系统方法=============================
  onLoad: function (options) {
    let kw = options.kw
    this.setData({
      searchValue: kw
    })

    // 检查用户是否存在
    if (wx.getStorageSync('uid')) {
      this.setData({
        uid: wx.getStorageSync('uid')
      })
    }

    this.onSearch()

  },

  onChange(event) {
    this.setData({
      searchValue: event.detail
    })
  },

  onPullDownRefresh: function () {
    this.onSearch()
    wx.stopPullDownRefresh();
  },


  // ==============================绑定方法============================

  onSearch() {
    let url = app.globalData.baseUrl + 'search.php'
    let data
    if (this.data.uid) {
      data = {
        uid: this.data.uid,
        kw: this.data.searchValue
      }
    } else {
      data = {
        kw: this.data.searchValue
      }
    }

    promise.request(url, data).then((res) => {
      if( res ) {
        this.setData({
          noResult: false
        })
        if (res.column) {
          this.setData({
            column: res.column
          })
        } else {
          this.setData({
            column: []
          })
        }
        if (res.articles) {
          this.setData({
            articles: res.articles
          })
        } else {
          this.setData({
            articles: []
          })
        }
      } else {
        this.setData({
          noResult: true
        })
      }
    })

  },


  // 跳转至“栏目”详情：传递 tid
  jumpTopic(event) {
    let tid = event.currentTarget.dataset.tid
    app.jumpTopic(tid)
  },

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpArticle(event) {
    let aid = event.currentTarget.dataset.aid
    let favorite = event.currentTarget.dataset.favorite
    app.jumpArticle(aid, favorite)
  },

})