//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用人人账单',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.showTabBar({
        //已获取用户信息，显示底部导航栏
      })
      wx.switchTab({  //已获取用户信息，将页面从引导页切换到账单页面
        url: '../bill/bill',
      })
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    else{
      wx.showToast({
        title: '点击允许，我们才能继续接下来的操作',
        icon: 'none'
      })
    }
  }
})