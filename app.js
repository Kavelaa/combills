//app.js
App({
  onLaunch: function() {
    const logs = wx.getStorageSync('logs') || []
    const blackList = wx.getStorageSync('blackList') || []

    wx.hideTabBar() //在不明确是否已获取用户信息情况下，先不显示底部导航栏

    logs.unshift(Date.now()) //本地登录记录
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://res.kavelaa.work',
            data: {
              code: res.code
            },
            success: res => {
              this.globalData.id = res.data.openid
              this.globalData.bills = res.data.bills.filter(bill => {   //黑名单过滤
                let flag = 1
                for (let i = 0; i < blackList.length; i++) {
                  if (bill.initTime === blackList[i].initTime) {
                    flag = 0
                    break
                  }
                }
                if (flag) {
                  return bill
                }
              })
              if (this.billsCallback) {   //两个回调，处理App异步获取账单较慢带来的问题
                this.billsCallback()
              }
              if (this.shareCallback) {
                this.shareCallback()
              }
              wx.setStorageSync('bills', res.data.bills) //备份账单到本地缓存
              console.log(this.globalData)
            },
            fail: () => {
              let bills = wx.getStorageSync('bills') || []
              this.globalData.bills = bills //如果服务器出错则采用本地缓存
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    id: null,
    bills: null
  }
})