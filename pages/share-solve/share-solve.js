const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    share: null
  },
  onLoad() {
    const bills = app.globalData.bills
    const share = app.globalData.share

    this.setData({
      share: share
    })
    if (bills) {
      for (let i = 0; i < bills.length; i++) {
        if (bills[i].initId === share.initId && bills[i].initTime === Number(share.initTime)) {
          wx.showToast({
            title: '经检测，您已加入了本账单，无需再加入，即将为你转到账单页面',
            icon: 'none'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../bill/bill'
            })
          }, 1500)
          return
        }
      }
    }
    wx.showToast({
      title: '等待信息',
      icon: 'loading',
      duration: 3000,
      mask: true
    })
    app.shareCallback = () => { //app异步获得账单还未完成，此时分享页面已完成加载，需要添加回调处理
      const bills = app.globalData.bills
      const share = app.globalData.share
      if (bills[0]) {
        for (let i = 0; i < bills.length; i++) {
          if (bills[i].initId === share.initId && bills[i].initTime === Number(share.initTime)) {
            wx.showToast({
              title: '经检测，您已加入了本账单，无需再加入，即将为你转到账单页面',
              icon: 'none'
            })
            setTimeout(() => {
              wx.switchTab({
                url: '../bill/bill'
              })
            }, 1500)
            break
          }
        }
      }
    }
  },
  agree(e) {
    const id = app.globalData.id
    const userInfo = e.detail.userInfo
    const bills = app.globalData.bills
    const share = app.globalData.share

    if (userInfo) {
      app.globalData.userInfo = userInfo
      wx.request({
        url: 'https://res.kavelaa.work/share',
        method: 'POST',
        data: {
          initId: share.initId,
          initTime: Number(share.initTime),
          id: id,
          name: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          joinTime: util.formatTime(new Date())
        },
        success: res => {
          console.log(res)
          bills.unshift(res.data.bill)
          wx.switchTab({
            url: '../bill/bill'
          })
        }
      })
    }
  },
  reject() {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})