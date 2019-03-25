// pages/article/article.js
const app = getApp();
let promise = require('../../utils/promise.js');

Page({

  // =========================绑定变量数据=============================
  data: {
    favorite: false
  },

  // =============================系统方法=============================
  onLoad: function(options) {
    this.getHtml(options.aid)
  },


  // ==============================绑定方法============================

  // 返回顶部
  backtop(event) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  // 获取 article 的 HTML 字符串及其他基本信息
  getHtml(aid) {
    let url = app.globalData.baseUrl + 'article_get_html.php';
    let data = {
      aid: aid
    };
    promise.request(url, data).then((res)=>{
      let html = `<div class='article'>${res.html}</div>`;
      this.setData({
        html: html,
        article: res
      });
      wx.setNavigationBarTitle({
        title: res.title
      })
    });
  },

  // 切换喜欢状态
  switchLike(){
    // TODO
  },

})