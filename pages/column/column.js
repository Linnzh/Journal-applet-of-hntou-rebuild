// pages/column/column.js
const app = getApp()
let promise = require('../../utils/promise.js');

Page({

  // =========================绑定变量数据=============================
  data: {
  },
  // =============================系统方法=============================
  onLoad: function (options) {
    // 1.检查用户是否存在
    if (app.checkUser()) {
      this.setData({
        uid: wx.getStorageSync('uid')
      })
    }
    this.allSections();
  },
  
  onShow: function() {
    // this.allSections();
  },

  // ==============================绑定方法============================

  allSections() {
    let url = app.globalData.baseUrl + 'column_tags_list.php';
    let data;
    if(app.checkUser()) {
      data = {
        uid: this.data.uid
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

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpArticle(event) {
    let aid = event.currentTarget.dataset.aid
    let favorite = event.currentTarget.dataset.favorite
    app.jumpArticle(aid, favorite)

  },


  // 切换【订阅】状态
  switchSubscribe(event) {
    let subscribe = event.currentTarget.dataset.subscribe
    let tid = event.currentTarget.dataset.tid
    let index = event.currentTarget.dataset.index

    if (app.checkUser()) {
      app.switchSubscribe(this.data.uid, tid, subscribe).then((res) => {
        this.setData({
          [`sections[${index}].subscribe`]: res
        })
      })
    } else {
      let info = app.getUserAuth(event)
      if (info) {
        app.userSignIn(info.name, info.avatar).then((res) => {
          this.setData({
            uid: res
          })
          this.specialColumn(this.data.tid)
        })
      } else {
        console.log("用户拒绝了授权！")
      }
    }
  },

  // 切换【喜欢】状态
  switchFavorite(event) {
    let aid = event.currentTarget.dataset.aid;
    let favorite = event.currentTarget.dataset.favorite;
    let index = event.currentTarget.dataset.index;
    let tindex = event.currentTarget.dataset.tindex;

    if (app.checkUser()) {
      // 换色
      app.switchFavorite(this.data.uid, aid, favorite).then((res)=>{
        this.setData({
          [`sections[${tindex}].articles[${index}].favorite`]: res
        })
      })

    } else {
      let info = app.getUserAuth(event)
      if (info) {
        app.userSignIn(info.name, info.avatar).then((res) => {
          this.setData({
            uid: res
          })
          this.specialColumn(this.data.tid)
        })
      } else {
        console.log("用户拒绝了授权！")
      }
    }
  },


})