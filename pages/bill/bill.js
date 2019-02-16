const app = getApp()
Page({
  data: {
    noBill: false,
    bills: []
  },
  onShow: function() {
    if (app.globalData.bills.length !== 0) {
      this.setData({
        noBill: false,
        bills: app.globalData.bills
      })
      console.log(app.globalData.bills)
    } else {
      this.setData({
        noBill: true
      })
    }
  }
})