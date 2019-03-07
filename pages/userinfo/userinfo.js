const app = getApp()
Page({
  data: {
    userInfo:{}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: 'logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  }
})