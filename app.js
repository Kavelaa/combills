//app.js
App({
  onLaunch: function() {
    wx.hideTabBar() //在不明确是否已获取用户信息情况下，先不显示底部导航栏
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var bills = wx.getStorageSync('bills') || []
    
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(this.globalData)
    this.globalData.bills = bills

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.switchTab({
                url: '../bill/bill',
              })
              wx.showTabBar({
                //获得用户信息成功，显示底部导航栏  
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    bills: []
  }
})