const app = getApp()

Page({
  data: {
    appear: false
    //canIUse: wx.canIUse('button.open-type.getUserInfo')
    //绝大多数设备的微信版本足够高，都会返回true，停止使用
  },
  onLoad: function(query) {
    if (Object.keys(query).length !== 0) {
      app.globalData.share = query
      wx.redirectTo({
        url: '../share-solve/share-solve'
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.showLoading({
            title: '等待信息',
          })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              wx.showTabBar({
                //已获取用户信息，显示底部导航栏
              })
              wx.hideLoading()
              wx.switchTab({ //已获取用户信息，将页面从引导页切换到账单页面
                url: '../bill/bill',
              })
            }
          })
        } else {
          this.setData({
            appear: true
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.showTabBar({
        //已获取用户信息，显示底部导航栏
      })
      wx.switchTab({ //已获取用户信息，将页面从引导页切换到账单页面
        url: '../bill/bill',
      })
    } else {
      wx.showToast({
        title: '点击允许，我们才能继续接下来的操作',
        icon: 'none'
      })
    }
  }
})