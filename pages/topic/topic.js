// pages/topic/topic.js
const app = getApp()
let promise = require('../../utils/promise.js');

Page({

  // =========================绑定变量数据=============================
  data: {
    tid: 0
  },


  // =============================系统方法=============================
  onLoad: function (options) {
    // 1.检查用户是否存在
    if (app.checkUser()) {
      this.setData({
        uid: wx.getStorageSync('uid')
      })
    }

    let tid = options.tid;
    this.setData({
      tid: tid
    })
    this.specialColumn(tid)
  },

  onPullDownRefresh: function () {
    this.specialColumn(this.data.tid)
    wx.stopPullDownRefresh();
  },


  // ==============================绑定方法============================

  // 专栏文章列表
  specialColumn(tid){
    let url = app.globalData.baseUrl + 'column_get_articles.php';
    let data;
    if(app.checkUser()) {
      data = {
        tid: tid,
        uid: this.data.uid
      }
    } else {
      data = {
        tid: tid
      }
    }
    promise.request(url, data).then((res)=>{
      this.setData({
        topic: res
      })
    })
  },

  // 跳转至“文章”详情：传递 aid favorite，并添加点击量
  jumpArticle(event) {
    let aid = event.currentTarget.dataset.aid
    app.jumpArticle(aid)
  },


  // 切换【订阅】状态
  switchSubscribe(event) {
    let subscribe = event.currentTarget.dataset.subscribe
    
    if(app.checkUser()) {
      app.switchSubscribe(this.data.uid, this.data.tid, subscribe).then((res) => {
        // let arr = this.data.topic
        // arr['subscribe'] = res
        this.setData({
          // topic: arr
          [`topic.subscribe`]: res
        })
      })

      // let arr = this.data.topic
      // arr['subscribe'] = !this.data.topic['subscribe']
      // this.setData({
      //   topic: arr
      // })
      // app.switchSubscribe(this.data.uid, this.data.tid, subscribe)

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
    // console.log(index)

    if(app.checkUser()) {
      // 换色
      app.switchFavorite(this.data.uid, aid, favorite).then((res)=>{
        // let arr = this.data.topic
        // arr['articles'][index]['favorite'] = res
        this.setData({
          // topic: arr
          // [`topic['articles'][${index}].favorite`]: res
          [`topic.articles[${index}].favorite`]: res
        })
      })

      // let arr = this.data.topic
      // arr['articles'][index]['favorite'] = !this.data.topic['articles'][index]['favorite']
      // this.setData({
      //   topic: arr
      // })
      // app.switchFavorite(this.data.uid, aid, favorite)
      
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