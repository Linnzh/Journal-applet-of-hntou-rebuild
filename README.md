# 热海大学报小程序(Journal-applet-of-hntou-rebuild)

> 2019届毕业设计作品。以本校学报为实物参考，制作的一款具有简单功能的小程序。

> 后台使用的是`PHP7` + `MySQL8`。其中小程序前端使用了[Vant Weapp](https://youzan.github.io/vant-weapp/#/intro) UI组件库，其余原生。
> 
> 后台项目地址：[Journal-management-website](https://github.com/Linnzh/Journal-management-website)


> 项目地址：[Journal-applet-of-hntou-rebuild](https://github.com/Linnzh/Journal-applet-of-hntou-rebuild)
> 
> 演示：[demo](https://www.bilibili.com/video/av53406024)


## 功能说明

- 【发现】
  - **最新发布**：按照发布时间展示已发布的文章
  - **近期热门**：按照浏览量展示已发布的文章
  - **搜索**：根据关键字进行模糊查询（使用jieba分词将查询关键字进行分词，然后在特定列查询，并给出结果），搜索结果仅供展示与页面跳转，不具备收藏文章/订阅栏目功能
  
  - #### 说明:
  1. 五角星图标: **收藏** 文章
  2. **栏目**：跳转至该专栏
  3. **文章**：跳转至该文章详情
   
   
- 【栏目】
  - 根据栏目展示其下的文章列表
  - #### 说明：
  1. 文章同样可**收藏**/**取消收藏**
  2. 栏目可**添加订阅**/**取消订阅**

- 【个人】
  - 根据登录状态展示不同结果：未登录则提示登录，已登录则展示用户详细信息
  - **我的收藏**：用户收藏的文章列表，可跳转，可取消收藏
  - **我的订阅**：用户订阅的栏目列表，可跳转，可取消订阅
  - #### 说明：
  1. **我要投稿**：微信官方暂未支持非图片文件上传，此功能冻结！

- 【文章】
  - 文章详情页。包括标题、发布时间、收藏状态、文章内容及评论列表。
  - #### 说明：
  1. **评论**：只允许评论，没有回复功能。


## 运行时截图

![发现界面](https://i.pinimg.com/564x/71/5b/eb/715beb231b3da956e75b0b7c511daec6.jpg)

![搜索结果界面](https://i.pinimg.com/564x/76/4a/63/764a63cb710e0d189b01a3f05eb75e00.jpg)

![栏目界面](https://i.pinimg.com/564x/af/d4/45/afd4456f09333f8d926bc7e5b396e602.jpg)

![用户界面](https://i.pinimg.com/564x/0b/63/18/0b631836b005e0e5ceb2e365b4e28d0d.jpg)

![文章界面](https://i.pinimg.com/564x/11/0c/80/110c80c0e15999c7b43895b3f61f41c6.jpg)
