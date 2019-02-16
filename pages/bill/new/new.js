const app = getApp()
const util = require('../../../utils/util')

Page({
  bindSubmit: function(e) {
    const time = Date.now()
    const bill = {
      name: e.detail.value.name,
      details: [{
        amount: Number(e.detail.value.amount)
      }]
    }
    bill.allCost = Number(e.detail.value.amount)
    bill.time = time
    bill.details[0].intelTime = util.formatTime(new Date(time))
    app.globalData.bills.unshift(bill)
    app.globalData.billDetail = bill
    wx.setStorageSync('bills', app.globalData.bills)
    wx.redirectTo({
      url: '../bill-detail/bill-detail'
    })
  }
})