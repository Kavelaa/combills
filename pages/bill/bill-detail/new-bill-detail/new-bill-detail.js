const app = getApp()
const util = require('../../../../utils/util')

Page({
  bindSubmit: function(e) {
    const bills = app.globalData.bills
    const billDetail = app.globalData.billDetail
    const time = Date.now()
    const detail = {
      amount: Number(e.detail.value.amount)
    }

    detail.intelTime = util.formatTime(new Date(time))
    for (let i = 0; i < bills.length; i++) {
      if (bills[i].time === billDetail.time) {
        bills[i].allCost += Number(e.detail.value.amount)
        bills[i].details.unshift(detail)
        app.globalData.billDetail = bills[i]
        wx.setStorageSync('bills', bills)
        break;
      }
    }
    wx.navigateBack()
  }
})