const app = getApp()
const util = require('../../../utils/util')

Page({
  data: {
    disabled: true
  },
  bindSubmit(e) {
    const time = Date.now()
    const id = app.globalData.id

    if (e.detail.value.name) {
      const bill = {
        name: e.detail.value.name,
        allCost: 0,
        initId: id,
        initTime: time,
        group: {},
        details: []
      }
      Object.defineProperty(bill.group, id, {
        value: {
          name: app.globalData.userInfo.nickName,
          avatar: app.globalData.userInfo.avatarUrl,
          joinTime: util.formatTime(new Date(time))
        },
        enumerable: true, //被对象包裹的对象，不强调以下属性，就会默认为false，存入缓存调用JSON.stringfy会忽略该属性
        writable: true,
        configurable: true
      })
      app.globalData.bills.unshift(bill)
      app.globalData.billIndex = 0
      wx.setStorageSync('bills', app.globalData.bills)
      wx.request({
        url: 'https://res.kavelaa.work/new',
        method: 'POST',
        data: {
          bill: bill
        }
      })
      console.log(app.globalData)
      wx.redirectTo({
        url: '../bill-detail/bill-detail'
      })
    } else {
      wx.showToast({
        title: '请输入账单名称',
        icon: 'none'
      })
    }
  },
  input(e) {
    if (e.detail.value !== '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  }
})